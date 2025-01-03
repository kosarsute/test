const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Check the ENV_TYPE environment variable
      const envType = process.env.ENV_TYPE; // Read the ENV_TYPE from the environment

      if (envType === "prod") {
        config.baseUrl = "https://www.google.com"; // Set baseUrl for production
      } else if (envType === "staging") {
        config.baseUrl = "https://www.facebook.com"; // Set baseUrl for staging
      } else {
        // Fallback for other environments or when ENV_TYPE is undefined
        config.baseUrl = "https://www.example.com";
      }
      console.log("OUR URL:", config.baseUrl)
      // Return the updated config
      return config;
    },
    failOnStatusCode: false,
  },
});
