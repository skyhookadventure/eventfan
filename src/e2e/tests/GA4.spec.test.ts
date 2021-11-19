import { test, expect } from "@playwright/test";
import expectRequest from "./utils/expectRequest";

test("It loads GA4", async ({ page }) => {
  const urlMatch = /www.googletagmanager.com\/gtag\/js/;
  await expectRequest(page, "http://127.0.0.1:8080", urlMatch);
});

test("It sends the page event", async ({ page }) => {
  await page.goto("http://127.0.0.1:8080");

  // Wait for script to load
  await page.waitForFunction(() => !!window.gtag);

  // Expect page to have been set
  const dataLayer = await page.evaluate(() => window.dataLayer);
  expect(
    dataLayer.some((event) => {
      return event[0] === "event" && event[1] === "page_view";
    })
  );
});

test("It sends the track event", async ({ page }) => {
  await page.goto("http://127.0.0.1:8080");

  // Wait for script to load
  await page.waitForFunction(() => !!window.gtag);

  // Expect page to have been set
  const dataLayer = await page.evaluate(() => window.dataLayer);
  expect(
    dataLayer.some((event) => {
      return event[0] === "event" && event[1] === "purchase";
    })
  );
});
