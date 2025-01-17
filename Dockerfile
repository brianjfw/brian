FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies with legacy peer deps
RUN npm install --legacy-peer-deps

# Copy the public directory first to ensure assets are available
COPY public ./public

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Install serve globally
RUN npm install -g serve

# Expose the port
EXPOSE ${PORT:-3000}

# Start the application
CMD serve --single --listen ${PORT:-3000} dist 