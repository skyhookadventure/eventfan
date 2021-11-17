import { test, expect } from "@playwright/test";

test("It loads Hotjar", async ({ page }) => {
  await page.goto("http://127.0.0.1:8080");

  // Expect the environment to be live
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const env = await page.evaluate(() => window.hj!.environment);
  expect(env).toBe("live");
});
