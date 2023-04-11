import { mockProductAdded } from "../../../../../mocks/ecommerce";
import productAdded from "../productAdded";

it("creates parameters matching the snapshot", () => {
  const res = productAdded(mockProductAdded);

  expect(res).toMatchInlineSnapshot(`
    {
      "name": "add_to_cart",
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
        "value": 100,
      },
    }
  `);
});
