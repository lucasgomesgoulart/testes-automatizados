const { defineConfig } = require("cypress");

module.exports = defineConfig({
  watchForFileChanges: false,
  projectId: "orrxpm",
  defaultCommandTimeout: 20000,
  experimentalMemoryManagement: true,
  e2e: {
    baseUrl: 'https://app.analyticare.com.br/authentication/login',

    mochaOptions: {
      reporter: "mochawesome",
      reporterOptions: {
        reportDir: "cypress/report/mochawesome-report",
        overwrite: true,
        html: true,
        json: false,
        timestamp: "mmddyyyy_HHMMss"
      }
    }
  },
});