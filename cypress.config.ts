import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "vue-cli",
      bundler: "vite",
    },
  },

  e2e: {
    baseUrl: 'http://localhost:8000',
    setupNodeEvents(on: any, config: any) {
      // implement node event listeners here
    },
  },
});
