import { defineConfig } from "@playwright/test";

export default defineConfig({
  webServer: {
    command: "npm start",
    port: 3000,
    timeout: 120000,
    reuseExistingServer: false,
  },
  use: {
    baseURL: "http://localhost:3000",
  },
});
