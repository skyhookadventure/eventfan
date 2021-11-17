import { mockCheckoutStarted } from "../../../../../mocks/ecommerce";
import checkoutStarted from "../checkoutStarted";

it("creates parameters matching the snapshot", () => {
  const res = checkoutStarted(mockCheckoutStarted);

  expect(res).toMatchInlineSnapshot(`
    Object {
      "name": "begin_checkout",
      "properties": Object {
        "coupon": undefined,
        "currency": "GBP",
        "items": Array [
          Object {
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
