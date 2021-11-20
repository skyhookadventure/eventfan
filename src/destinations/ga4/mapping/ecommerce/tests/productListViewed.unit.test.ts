import { mockProductListViewed } from "../../../../../mocks/ecommerce";
import productListViewed from "../productListViewed";

it("creates parameters matching the snapshot", () => {
  const res = productListViewed(mockProductListViewed);

  expect(res).toMatchInlineSnapshot(`
    Object {
      "name": "view_item_list",
      "properties": Object {
        "item_list_id": "list_id",
        "items": Array [
          Object {
            "item_id": "productID",
            "item_name": "Product Name",
            "price": 100,
            "quantity": 1,
          },
        ],
      },
    }
  `);
});
