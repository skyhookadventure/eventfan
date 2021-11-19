import { test, expect } from "@playwright/test";
import expectRequest from "./utils/expectRequest";

test("It loads the FB Pixel", async ({ page }) => {
  await page.goto("http://127.0.0.1:8080");
  await page.waitForFunction(() => !!window.fbq?.getState?.());

  // Expect the pixel id to be set
  const pixelState = await page.evaluate(() => (window as any).fbq.getState());
  expect(pixelState.pixels[0].id).toBeTruthy();
});

test("It sends the page event", async ({ page }) => {
  const urlMatch = /www.facebook.com\/tr\/\?id=[\d]*&ev=PageView/;
  await expectRequest(page, "http://127.0.0.1:8080", urlMatch);
});

test("It sends the track event", async ({ page }) => {
  const urlMatch = /www.facebook.com\/tr\/\?id=[\d]*&ev=Purchase/;
  await expectRequest(page, "http://127.0.0.1:8080", urlMatch);
});
