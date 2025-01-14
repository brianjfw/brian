# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm cache clean --force && \
    HUSKY=0 NPM_CONFIG_IGNORE_SCRIPTS=true npm ci

# Copy source files first, ensuring data directory is included
COPY . .

# Verify data directory exists
RUN set -e && \
    echo "Verifying data directory..." && \
    if [ ! -d "data" ]; then echo "data directory not found!"; exit 1; fi && \
    echo "Contents of data directory:" && \
    ls -la data/

# Set environment variables for static generation
ENV NODE_ENV=production
ENV NUXT_TELEMETRY_DISABLED=1
# Enable Nuxt debug output
ENV DEBUG=nuxt:*

# Generate static files with error checking and verbose output
RUN set -e && \
    echo "Running nuxt generate with verbose output..." && \
    echo "Node version:" && node -v && \
    echo "NPM version:" && npm -v && \
    echo "Available memory:" && free -h || true && \
    echo "Directory contents before generate:" && ls -la && \
    NODE_OPTIONS="--max_old_space_size=4096 --trace-warnings" npm run generate --verbose && \
    echo "Verifying dist directory exists..." && \
    if [ ! -d "dist" ]; then echo "dist directory not found!"; exit 1; fi && \
    echo "Verifying dist directory contents:" && \
    ls -la dist/ && \
    echo "Checking for index.html..." && \
    if [ ! -f "dist/index.html" ]; then \
        echo "index.html not found! Contents of dist:"; \
        ls -la dist/; \
        echo "Contents of dist/_nuxt:"; \
        ls -la dist/_nuxt/; \
        echo "Checking for any HTML files:"; \
        find dist -name "*.html" -type f; \
        echo "Package.json contents:"; \
        cat package.json; \
        echo "Nuxt config contents:"; \
        cat nuxt.config.js; \
        exit 1; \
    fi && \
    echo "Checking index.html content:" && \
    cat dist/index.html | head -n 5

# Production stage
FROM nginx:alpine

WORKDIR /app

# Copy nginx configurations
COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf

# Copy static files from builder with verification
COPY --from=builder /app/dist /usr/share/nginx/html

# Verify files and configuration
RUN set -e && \
    echo "Verifying nginx configurations:" && \
    ls -la /etc/nginx/conf.d/ && \
    ls -la /etc/nginx/ && \
    echo "Verifying static files:" && \
    ls -la /usr/share/nginx/html/ && \
    if [ ! -f "/usr/share/nginx/html/index.html" ]; then echo "index.html not found in nginx html dir!"; exit 1; fi && \
    echo "Checking nginx config:" && \
    nginx -t && \
    echo "Creating log directories:" && \
    mkdir -p /var/log/nginx && \
    touch /var/log/nginx/access.log && \
    touch /var/log/nginx/error.log && \
    chown -R nginx:nginx /var/log/nginx

# Expose port
EXPOSE 80

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s \
    CMD wget -q --spider http://localhost:80/ || exit 1

# Start nginx with error log redirection
CMD ["sh", "-c", "nginx -g 'daemon off;' 2>&1 | tee -a /var/log/nginx/error.log"] 