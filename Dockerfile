# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies with verbose logging
COPY package*.json ./
RUN npm cache clean --force && \
    NPM_CONFIG_LOGLEVEL=verbose npm ci && \
    echo "Verifying node_modules:" && \
    ls -la node_modules/.bin/nuxt

# Copy source files
COPY . .

# Generate static files
ENV NODE_ENV=production
ENV NUXT_TELEMETRY_DISABLED=1
RUN npm run generate

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package files and install production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy server file and static files from builder
COPY server.js ./
COPY --from=builder /app/dist ./dist

# Expose port (this is just documentation)
EXPOSE 3000

# Start the server
CMD ["npm", "start"] 