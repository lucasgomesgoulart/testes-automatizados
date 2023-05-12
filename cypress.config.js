const { defineConfig } = require("cypress");

module.exports = defineConfig({
  watchForFileChanges: false,
  projectId: "orrxpm",


  e2e: {
    baseUrl: 'https://dev.analyticare.com.br',

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
