# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

# Build application
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nuxtjs -u 1001

# Copy built assets from builder
COPY --from=builder /app/.nuxt ./.nuxt
COPY --from=builder /app/static ./static
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/nuxt.config.js ./

# Install production dependencies only
RUN npm ci --only=production

# Set environment variables
ENV HOST=0.0.0.0
ENV PORT=3000
ENV NODE_ENV=production

# Switch to non-root user
USER nuxtjs

EXPOSE 3000

# Start the application
CMD ["npm", "start"] 