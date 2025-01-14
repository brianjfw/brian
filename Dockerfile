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
RUN npm run generate

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install serve for static file serving
RUN npm install -g serve@14.2.1

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nuxtjs -u 1001

# Copy only the generated static files
COPY --from=builder /app/dist ./dist

# Set environment variables
ENV HOST=0.0.0.0
ENV PORT=3000
ENV NODE_ENV=production

# Switch to non-root user
USER nuxtjs

EXPOSE 3000

# Start the static file server
CMD ["serve", "-s", "dist", "-l", "3000"] 