/* eslint-disable no-underscore-dangle */
import { test, expect } from "@playwright/test";

test("It loads GA4", async ({ page }) => {
  await page.goto("http://127.0.0.1:8080");

  // Expect the dataLayer log to have multiple calls stored
  const res = await page.evaluate(() => window.dataLayer);
  expect(res.length > 3).toBeTruthy();
});
