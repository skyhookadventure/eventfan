/* eslint-disable no-underscore-dangle */
import { test, expect } from "@playwright/test";

test("It loads Posthog", async ({ page }) => {
  await page.goto("http://127.0.0.1:8080");

  // Wait for script to load
  await page.waitForFunction(() => !!window.posthog);

  // Expect the token to be set
  const res = await page.evaluate(() => (window as any).posthog.config);
  expect(res.token).toBeTruthy();
});
