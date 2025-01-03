# Use the Cypress base image
FROM cypress/included:12.8.1

# Set default UID and GID (TeamCity values)
ARG UID=1001
ARG GID=1001

# Create a group and user dynamically as non-root
RUN groupadd -g $GID appgroup && \
    useradd -m -u $UID -g appgroup appuser

# Set ownership to appuser for Cypress work directories
RUN mkdir -p /home/appuser/cypress/videos \
             /home/appuser/cypress/screenshots \
             /home/appuser/cypress/downloads && \
    chown -R $UID:$GID /home/appuser

# Set working directory and switch to appuser
WORKDIR /home/appuser

# Copy application files and install dependencies
COPY package.json .
RUN npm install --legacy-peer-deps

# Copy Cypress configuration and test files
COPY cypress.config.js .
COPY cypress/ ./cypress/

# Configure custom paths for Cypress output (optional)
ENV CYPRESS_VIDEOS_FOLDER=/home/appuser/cypress/videos \
    CYPRESS_SCREENSHOTS_FOLDER=/home/appuser/cypress/screenshots
