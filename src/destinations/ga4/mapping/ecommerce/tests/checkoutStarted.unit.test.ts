import { mockCheckoutStarted } from "../../../../../mocks/ecommerce";
import checkoutStarted from "../checkoutStarted";

it("creates parameters matching the snapshot", () => {
  const res = checkoutStarted(mockCheckoutStarted);

  expect(res).toMatchInlineSnapshot(`
    {
      "name": "begin_checkout",
      "properties": {
        "coupon": undefined,
        "currency": "GBP",
        "items": [
          {
            "item_id": "productID",
            "item_name": "Product Name",
            "price": 100,
            "quantity": 1,
          },
        ],
        "value": 200,
      },
    }
  `);
});
