FROM cypress/included:12.8.1

# Set default UID and GID (TeamCity values)
ARG UID=1001
ARG GID=1001

# Create a group and user dynamically
RUN groupadd -g $GID appgroup && \
    useradd -m -u $UID -g appgroup appuser

# Pre-create directories with proper permissions for Cypress
RUN mkdir -p /home/appuser/cypress/videos \
             /home/appuser/cypress/screenshots \
             /home/appuser/cypress/downloads && \
    chown -R appuser:appgroup /home/appuser/cypress && \
    chmod -R 775 /home/appuser/cypress

# Switch to appuser
USER appuser
WORKDIR /home/appuser

# Copy application files and install dependencies
COPY package.json .
RUN npm install --legacy-peer-deps

# Copy Cypress configuration and test files
COPY cypress.config.js .
COPY cypress/ ./cypress/

# Ensure working directory permissions are correctly set
RUN chown -R appuser:appgroup /home/appuser && \
    chmod -R 775 /home/appuser
