import { defineConfig } from "@playwright/test";

export default defineConfig({
  webServer: {
    command: "npm run serve",
    port: 3000,
    timeout: 120000,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: "http://localhost:3000",
  },
});
