import { mockProductListViewed } from "../../../../../mocks/ecommerce";
import productListViewed from "../productListViewed";

it("creates parameters matching the snapshot", () => {
  const res = productListViewed(mockProductListViewed);

  expect(res).toMatchInlineSnapshot(`
    {
      "name": "view_item_list",
      "properties": {
        "item_list_id": "list_id",
        "items": [
          {
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
