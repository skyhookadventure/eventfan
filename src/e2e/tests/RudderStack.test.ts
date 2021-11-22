import { test } from "@playwright/test";
import expectRequest from "./utils/expectRequest";

test("It sends the identify event", async ({ page }) => {
  page.click("text=Identify");
  const urlMatch = /hosted.rudderlabs.com\/v1\/identify/;
  await expectRequest(page, "http://127.0.0.1:8080", urlMatch);
});

test("It sends the page event", async ({ page }) => {
  page.click("text=Page");
  const urlMatch = /hosted.rudderlabs.com\/v1\/page/;
  await expectRequest(page, "http://127.0.0.1:8080", urlMatch);
});

test("It sends the track event", async ({ page }) => {
  page.click("text=Order Completed");
  const urlMatch = /hosted.rudderlabs.com\/v1\/track/;
  await expectRequest(page, "http://127.0.0.1:8080", urlMatch);
});
