# Use official Node.js image as the base
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Expose port 3001 to be accessible from outside the container
EXPOSE 3001

# Command to start the frontend
CMD ["npm", "start"]
