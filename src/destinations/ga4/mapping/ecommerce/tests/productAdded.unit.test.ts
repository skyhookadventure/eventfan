import { mockProductAdded } from "../../../../../mocks/ecommerce";
import productAdded from "../productAdded";

it("creates parameters matching the snapshot", () => {
  const res = productAdded(mockProductAdded);

  expect(res).toMatchInlineSnapshot(`
    Object {
      "name": "add_to_cart",
      "properties": Object {
        "currency": "USD",
        "items": Array [
          Object {
            "item_id": "productID",
            "item_name": "Product Name",
            "price": 100,
            "quantity": 1,
          },
        ],
        "value": 100,
      },
    }
  `);
});
