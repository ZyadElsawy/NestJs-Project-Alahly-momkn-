# Use Node.js LTS version as the base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig*.json ./

# Install dependencies including development dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Clean and build the application
RUN npm run clean && npm run build

# Build the seeder
RUN npm run build:seed

# Expose the port (assuming default NestJS port 3000)
EXPOSE 3000

# Run seed and start the application
CMD /bin/sh -c "npm run seed && npm run start:dev" 