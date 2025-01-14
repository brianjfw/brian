# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies with verbose logging
COPY package*.json ./
RUN npm cache clean --force && \
    HUSKY=0 NPM_CONFIG_IGNORE_SCRIPTS=true NPM_CONFIG_LOGLEVEL=verbose npm ci && \
    echo "Verifying node_modules:" && \
    ls -la node_modules/.bin/nuxt

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
ENV NPM_CONFIG_LOGLEVEL=verbose

# Generate static files with debug output
RUN set -x && \
    echo "Starting nuxt generate with debug output..." && \
    NODE_OPTIONS="--max-old-space-size=4096" NUXT_TELEMETRY_DISABLED=1 npm run generate 2>&1 | tee generate.log || \
    (echo "Static generation failed. Debug output:" && \
     cat generate.log && \
     if [ ! -d "dist" ]; then \
       echo "dist directory not found" && \
       exit 1; \
     fi && \
     if [ ! -f "dist/index.html" ]; then \
       echo "index.html not found in dist directory" && \
       echo "Contents of dist directory:" && \
       ls -la dist/ && \
       echo "Contents of dist/_nuxt directory:" && \
       ls -la dist/_nuxt/ || true && \
       exit 1; \
     fi)

# Verify generated files
RUN echo "Verifying generated files..." && \
    ls -la dist/ && \
    echo "Contents of dist/_nuxt:" && \
    ls -la dist/_nuxt/ || true && \
    if [ -f dist/index.html ]; then \
      echo "First 10 lines of index.html:" && \
      head -n 10 dist/index.html; \
    else \
      echo "index.html not found!" && \
      exit 1; \
    fi

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