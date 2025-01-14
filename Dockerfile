# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies with verbose logging
COPY package*.json ./
RUN npm cache clean --force && \
    HUSKY=0 NPM_CONFIG_IGNORE_SCRIPTS=true NPM_CONFIG_LOGLEVEL=verbose npm ci && \
    echo "Verifying node_modules:" && \
    ls -la node_modules/.bin/nuxt

# Copy source files
COPY . .

# Generate static files
ENV NODE_ENV=production
ENV NUXT_TELEMETRY_DISABLED=1
RUN npm run generate

# Production stage
FROM nginx:alpine

# Copy nginx configurations
COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf

# Copy entrypoint script
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Copy static files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Create log directories with correct permissions
RUN mkdir -p /var/log/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chmod -R 755 /var/log/nginx

# Switch to non-root user
USER nginx

# Expose port (this is just documentation)
EXPOSE 3000

# Use our entrypoint script
ENTRYPOINT ["/docker-entrypoint.sh"] 