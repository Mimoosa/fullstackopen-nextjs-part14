import { defineConfig } from "@playwright/test";

export default defineConfig({
  webServer: {
    command: "npm start",
    url: "http://10.1.0.166:3000",
    reuseExistingServer: true,
  },
  use: {
    baseURL: "http://10.1.0.166:3000",
  },
});
