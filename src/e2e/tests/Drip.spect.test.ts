import { test } from "@playwright/test";
import expectRequest from "./utils/expectRequest";

test.skip("It loads Drip", async ({ page }) => {
  const urlMatch = /api.getdrip.com\/client\/config\?drip_account_id/;
  await expectRequest(page, "http://127.0.0.1:8080", urlMatch);
});
