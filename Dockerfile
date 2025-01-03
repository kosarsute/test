FROM cypress/included:12.8.1

# Set default UID and GID (TeamCity values)
ARG UID=1001
ARG GID=1001

# Create a group and user dynamically

# Switch to appuser
USER appuser
WORKDIR /home/appuser

# Copy application files and install dependencies
COPY package.json .
RUN npm install --legacy-peer-deps

# Copy Cypress configuration and test files
COPY cypress.config.js .
COPY cypress/ ./cypress/
