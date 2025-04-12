# Use official Node.js image as the base
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the product service code
COPY . .

# Expose port 3002 to be accessible from outside the container
EXPOSE 3002

# Command to start the product service
CMD ["npm", "start"]
