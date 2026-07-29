import { defineConfig } from "@playwright/test";

export default defineConfig({
  webServer: {
    command: "npm start",
    url: process.env.NEXTAUTH_URL,
    reuseExistingServer: false,
  },
  use: {
    baseURL: process.env.NEXTAUTH_URL,
  },
});
