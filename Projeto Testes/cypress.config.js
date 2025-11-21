import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    specPattern: "backend/tests/cypress/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

