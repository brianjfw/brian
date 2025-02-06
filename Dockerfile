# Use the official Node.js 16 image as the base image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application code to the working directory
COPY . .

# Build the Nuxt.js application
RUN npm run build

# Expose the port that the Nuxt.js application will listen on
EXPOSE 3000

# Command to start the Nuxt.js application
CMD ["npm", "start"]