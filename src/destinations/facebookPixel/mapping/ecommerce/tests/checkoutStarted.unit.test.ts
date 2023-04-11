import { mockCheckoutStarted } from "../../../../../mocks/ecommerce";
import FacebookPixel from "../../../FacebookPixel";
import checkoutStarted from "../checkoutStarted";

it("creates parameters matching the snapshot", () => {
  const res = checkoutStarted.call(
    new FacebookPixel({ pixelId: "pixelID" }),
    mockCheckoutStarted
  );

  expect(res).toMatchInlineSnapshot(`
    {
      "name": "InitiateCheckout",
      "properties": {
        "content_ids": [
          "productID",
        ],
        "content_type": [
          "product",
        ],
        "contents": [
          {
            "id": "productID",
            "quantity": 1,
          },
        ],
        "currency": "GBP",
        "eventID": "orderID",
        "value": 200,
      },
    }
  `);
});
