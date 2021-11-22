import { mockProductViewed } from "../../../../../mocks/ecommerce";
import productViewed from "../productViewed";

it("creates parameters matching the snapshot", () => {
  const res = productViewed(mockProductViewed);

  expect(res).toMatchInlineSnapshot(`
    Object {
      "name": "view_item",
      "properties": Object {
        "currency": "GBP",
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
