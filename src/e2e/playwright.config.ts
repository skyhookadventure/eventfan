import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  use: {
    headless: true,
  },
  projects: [
    {
      name: "Chromium",
      use: { browserName: "chromium" },
    },
    // For now just run on Chrome as Firefox/Webkit are very slow.
    // {
    //   name: "Firefox",
    //   use: { browserName: "firefox" },
    // },
    // {
    //   name: "WebKit",
    //   use: { browserName: "webkit" },
    // },
  ],
};
export default config;
