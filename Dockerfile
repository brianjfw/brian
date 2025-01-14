# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm cache clean --force && \
    HUSKY=0 NPM_CONFIG_IGNORE_SCRIPTS=true npm ci

# Copy source
COPY . .

# Generate static files
RUN npm run generate && \
    echo "Verifying dist directory contents:" && \
    ls -la dist/ && \
    echo "Checking for index.html:" && \
    cat dist/index.html | head -n 5

# Production stage
FROM nginx:alpine

WORKDIR /app

# Copy nginx configurations
COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf

# Copy static files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Verify files are copied correctly
RUN echo "Verifying nginx configurations:" && \
    ls -la /etc/nginx/conf.d/ && \
    ls -la /etc/nginx/ && \
    echo "Verifying static files:" && \
    ls -la /usr/share/nginx/html/ && \
    echo "Checking nginx config:" && \
    nginx -t

# Expose port
EXPOSE 80

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s \
    CMD wget -q --spider http://localhost:80/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"] 