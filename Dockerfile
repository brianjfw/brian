# Use the Node official image
FROM node:lts

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . ./

# Build the Next.js application
RUN npm run build

# Expose the port Next.js listens on (default is 3000)
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"] 