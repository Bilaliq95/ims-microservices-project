# Use official Node.js image as the base
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies and rebuild bcrypt to match container architecture
RUN npm install
RUN npm install --save-dev jest supertest


# Copy the rest of the auth service code
COPY . .

# Expose port 3000 to be accessible from outside the container
EXPOSE 3000

# Command to start the auth service
COPY .env.test .env.test
CMD ["npm", "start"]
