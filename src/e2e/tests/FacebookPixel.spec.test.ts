import { test, expect } from "@playwright/test";

test("It loads the FB Pixel", async ({ page }) => {
  await page.goto("http://127.0.0.1:8080");

  // Expect the pixel id to be set
  const pixelState = await page.evaluate(() => (window as any).fbq.getState());
  expect(pixelState.pixels[0].id).toBeTruthy();
});
