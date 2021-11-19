import { Page, Request } from "playwright-core";
import { expect } from "@playwright/test";

/**
 * Expect the page to make a request (without an error response)
 */
export default async function expectRequest(
  page: Page,
  goto: string,
  expectedURL: RegExp | string
) {
  // Log requests
  const requests: Array<Request> = [];
  page.on("request", (req) => {
    requests.push(req);
  });

  // Wait for the request
  await page.goto(goto);
  await page.waitForRequest(expectedURL);

  // Check it succeeded
  expect(
    requests.some((i) => {
      return i.url().match(expectedURL) && i.failure() === null;
    })
  );
}
