# Use Node.js LTS version as base image
FROM node:24-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app source code
COPY . .

# Expose port
EXPOSE 8020

# Start the application
CMD ["npm", "start"]