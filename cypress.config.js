const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      console.log('process.env.ENV_TYPE:', process.env.ENV_TYPE); // Check environment variable in the Node process
      console.log('config.env.ENV_TYPE:', config.env.ENV_TYPE);   // Check Cypress-provided value
      
      const envType = config.env.ENV_TYPE || process.env.ENV_TYPE || 'local';
      console.log('Environment Type:', envType);                 // Confirm the effective environment type

      if (envType === 'rc') {
        config.baseUrl = 'https://google.com';
      } else if (envType === 'prod') {
        config.baseUrl = 'https://facebook.com';
      } else {
        config.baseUrl = 'https://localhost'; // Default fallback
      }
      
      console.log('Base URL set to:', config.baseUrl);
      return config;
    },
    failOnStatusCode: false,
  },
});
