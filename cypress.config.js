const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      const envType = config.env.ENV_TYPE || 'local';
      console.log('Environment Type:', envType); // Debug the ENV_TYPE
      if (envType === 'rc') {
        config.baseUrl = 'https://google.com';
      } else if (envType === 'prod') {
        config.baseUrl = 'https://facebook.com';
      } else {
        config.baseUrl = 'https://localhost'; // Default fallback
      }
      console.log('Base URL set to:', config.baseUrl); // Verify baseUrl value
      return config;
    },
    failOnStatusCode: false,
  },
});
