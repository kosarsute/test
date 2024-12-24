# Use the official Cypress base image
FROM cypress/included:latest

# Set the working directory inside the container
WORKDIR /app

# Copy the contents of your project to the working directory
COPY . .

# Install any required dependencies (if necessary)
RUN npm install

# Command to run Cypress tests (update this if needed)
CMD ["npm", "run", "test"]
