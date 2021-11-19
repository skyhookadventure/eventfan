import { test } from "@playwright/test";
import expectRequest from "./utils/expectRequest";

test("It loads Hotjar", async ({ page }) => {
  const urlMatch = /static.hotjar.com\/c\/hotjar/;
  await expectRequest(page, "http://127.0.0.1:8080", urlMatch);
});
