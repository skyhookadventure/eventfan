import { test } from "@playwright/test";
import expectRequest from "./utils/expectRequest";

test("It loads the Sentry destination without throwing", async ({ page }) => {
  await page.goto("http://127.0.0.1:8080");
});

test("It sends the identify event with an error", async ({ page }) => {
  page.click("text=Identify");
  const urlMatch = /.*ingest.sentry.io.*/;
  await expectRequest(page, "http://127.0.0.1:8080", urlMatch);
});

test("It sends the track event with an error", async ({ page }) => {
  page.click("text=Order Completed");
  const urlMatch = /.*ingest.sentry.io.*/;
  await expectRequest(page, "http://127.0.0.1:8080", urlMatch);
});
