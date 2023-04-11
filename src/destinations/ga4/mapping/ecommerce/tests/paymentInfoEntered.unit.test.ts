import { mockPaymentInfoEntered } from "../../../../../mocks/ecommerce";
import paymentInfoEntered from "../paymentInfoEntered";

it("creates parameters matching the snapshot", () => {
  const res = paymentInfoEntered(mockPaymentInfoEntered);

  expect(res).toMatchInlineSnapshot(`
    {
      "name": "add_payment_info",
      "properties": {
        "currency": "GBP",
        "items": [
          {
            "item_id": "productID",
            "item_name": "Product Name",
            "price": 100,
            "quantity": 1,
          },
        ],
        "payment_type": undefined,
        "value": 100,
      },
    }
  `);
});
