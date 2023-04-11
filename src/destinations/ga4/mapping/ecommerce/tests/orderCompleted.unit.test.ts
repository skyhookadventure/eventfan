import { mockOrderCompleted } from "../../../../../mocks/index";
import orderCompleted from "../orderCompleted";

it("creates parameters matching the snapshot", () => {
  const res = orderCompleted(mockOrderCompleted);

  expect(res).toMatchInlineSnapshot(`
    {
      "name": "purchase",
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
        "shipping": undefined,
        "tax": undefined,
        "transaction_id": "orderID",
        "value": 200,
      },
    }
  `);
});
