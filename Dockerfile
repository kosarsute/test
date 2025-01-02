FROM cypress/included:12.8.1

# Set default UID and GID (TeamCity values)
ARG UID=1001
ARG GID=1001

# Create a group and user dynamically
RUN groupadd -g $GID appgroup && \
    useradd -m -u $UID -g appgroup appuser

# Switch to appuser
USER appuser
WORKDIR /home/appuser

RUN mkdir -p cypress/reports/mochawesome

# Create writable directories for Cypress
RUN mkdir -p /home/appuser/cypress/screenshots /home/appuser/cypress/reports

# Set up npm global install location to avoid permission issues
RUN mkdir -p /home/appuser/.npm-global && \
    npm config set prefix /home/appuser/.npm-global && \
    echo 'export PATH=$PATH:/home/appuser/.npm-global/bin' >> /home/appuser/.bashrc

# Copy application files and install dependencies
COPY package.json .
RUN npm install --legacy-peer-deps

# Copy Cypress configuration and test files
COPY cypress.config.js .
COPY cypress/ ./cypress/
