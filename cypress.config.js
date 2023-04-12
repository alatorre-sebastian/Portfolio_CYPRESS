const { defineConfig } = require("cypress");
module.exports = defineConfig({
  "chromeWebSecurity": false,//Agregamos esto para poder hacer pruebas en iframe
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://qa-practice.netlify.app/auth_ecommerce.html", //Agregamos url base
    video: true, // Agregamos esto para grabar video
    trashAssetsBeforeRuns: false, // Agregamos esto para no borrar los videos
  },
});

