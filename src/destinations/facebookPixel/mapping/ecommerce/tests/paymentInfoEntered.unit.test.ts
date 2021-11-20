import { mockPaymentInfoEntered } from "../../../../../mocks/ecommerce";
import paymentInfoEntered from "../paymentInfoEntered";

it("creates parameters matching the snapshot", () => {
  const res = paymentInfoEntered(mockPaymentInfoEntered);

  expect(res).toMatchInlineSnapshot(`
    Object {
      "name": "AddPaymentInfo",
      "properties": Object {
        "content_ids": Array [
          "productID",
        ],
        "contents": Array [
          Object {
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
