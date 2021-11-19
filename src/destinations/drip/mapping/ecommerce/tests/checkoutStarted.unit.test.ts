import { mockCheckoutStarted } from "../../../../../mocks/ecommerce";
import checkoutStarted from "../checkoutStarted";

it("creates parameters matching the snapshot", () => {
  const res = checkoutStarted(mockCheckoutStarted);

  expect(res).toMatchInlineSnapshot(`
    Object {
      "name": "Checkout Started",
      "properties": Object {
        "value": 20000,
      },
    }
  `);
});
