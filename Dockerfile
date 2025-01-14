# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm cache clean --force && \
    HUSKY=0 NPM_CONFIG_IGNORE_SCRIPTS=true npm ci

# Copy source
COPY . .

# Generate static files with error checking
RUN set -e && \
    echo "Running nuxt generate..." && \
    npm run generate && \
    echo "Verifying dist directory exists..." && \
    if [ ! -d "dist" ]; then echo "dist directory not found!"; exit 1; fi && \
    echo "Verifying dist directory contents:" && \
    ls -la dist/ && \
    echo "Verifying index.html exists..." && \
    if [ ! -f "dist/index.html" ]; then echo "index.html not found!"; exit 1; fi && \
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