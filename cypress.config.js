const { defineConfig } = require("cypress");
const path = require("path");

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
      console.log("OUR URL:", config.baseUrl);

      // Return the updated config
      return config;
    },
    failOnStatusCode: false,
    screenshotsFolder: process.env.TEAMCITY_BUILD_CHECKOUT_DIR
      ? path.join(process.env.TEAMCITY_BUILD_CHECKOUT_DIR, "cypress/screenshots")
      : "cypress/screenshots", // Dynamically set screenshots folder
  },
  reporter: "cypress-multi-reporters",
  reporterOptions: {
    reporterEnabled: "mochawesome, cypress-qase-reporter",
    mochawesomeReporterOptions: {
      reportDir: "cypress/reports/mochawesome",
      overwrite: false,
      html: true,
      json: true,
      charts: true,
      reportFilename: `mochawesome_${Date.now()}`, // Unique filename
    },
    cypressQaseReporterReporterOptions: {
      debug: false,
      testops: {
        api: {
          token: "your-qase-api-token",
        },
        project: "YOUR_PROJECT_CODE",
        uploadAttachments: true,
        run: {
          complete: true,
          title: `Cypress Automated Run`,
          id: process.env.QASE_RUN_ID,
        },
      },
    },
  },
});
