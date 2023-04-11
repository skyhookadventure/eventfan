import { mockPaymentInfoEntered } from "../../../../../mocks/ecommerce";
import paymentInfoEntered from "../paymentInfoEntered";

it("creates parameters matching the snapshot", () => {
  const res = paymentInfoEntered(mockPaymentInfoEntered);

  expect(res).toMatchInlineSnapshot(`
    {
      "name": "AddPaymentInfo",
      "properties": {
        "content_ids": [
          "productID",
        ],
        "contents": [
          {
            "id": "productID",
            "quantity": 1,
          },
        ],
        "currency": "GBP",
        "eventID": "orderID",
        "value": 100,
      },
    }
  `);
});
