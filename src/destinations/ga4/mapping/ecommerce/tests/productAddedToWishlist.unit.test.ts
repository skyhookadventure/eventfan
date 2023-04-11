import { mockProductAddedToWishlist } from "../../../../../mocks/ecommerce";
import productAddedToWishlist from "../productAddedToWishlist";

it("creates parameters matching the snapshot", () => {
  const res = productAddedToWishlist(mockProductAddedToWishlist);

  expect(res).toMatchInlineSnapshot(`
    {
      "name": "add_to_wishlist",
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
