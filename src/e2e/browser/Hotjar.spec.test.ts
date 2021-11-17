/* eslint-disable no-underscore-dangle */
import { test, expect } from "@playwright/test";

test("It loads Hotjar", async ({ page }) => {
  await page.goto("http://127.0.0.1:8080");

  await new Promise<void>((res) => {
    setTimeout(() => res(), 3000);
  });
  // Expect the environment to be live
  const env = await page.evaluate(() => window._hjSettings);
  expect(env.hjid).toBeTruthy();
});
