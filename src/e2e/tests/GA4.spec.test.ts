import { test } from "@playwright/test";
import expectRequest from "./utils/expectRequest";

test("It loads GA4", async ({ page }) => {
  const urlMatch = /www.googletagmanager.com\/gtag\/js/;
  await expectRequest(page, "http://127.0.0.1:8080", urlMatch);
});

test("It sends the identify event", async ({ page }) => {
  page.click("text=Identify");
  const urlMatch = /google-analytics.com\/g\/collect.*userID/;
  await expectRequest(page, "http://127.0.0.1:8080", urlMatch);
});

test("It sends the page event", async ({ page }) => {
  page.click("text=Page");
  const urlMatch = /google-analytics.com\/g\/collect.*page_view/;
  await expectRequest(page, "http://127.0.0.1:8080", urlMatch);
});

test("It sends the track event", async ({ page }) => {
  page.click("text=Order Completed");
  const urlMatch = /google-analytics.com\/g\/collect.*purchase/;
  await expectRequest(page, "http://127.0.0.1:8080", urlMatch);
});
