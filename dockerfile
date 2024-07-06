# Use the official Node.js image as a base image
FROM node:18

# Set the working directory
WORKDIR /src

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Ensure the uploads directory exists
RUN mkdir -p /src/uploads

# Expose the application port
EXPOSE 6543

# Make the start script executable
RUN chmod +x ./start.sh

# Start the application
CMD ["./start.sh"]
