const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://qa-practice.netlify.app/auth_ecommerce.html", //Agregamos url base
  },
});

