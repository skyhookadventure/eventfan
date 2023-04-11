import { mockProductViewed } from "../../../../../mocks/ecommerce";
import productViewed from "../productViewed";

it("creates parameters matching the snapshot", () => {
  const res = productViewed(mockProductViewed);

  expect(res).toMatchInlineSnapshot(`
    {
      "name": "view_item",
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
