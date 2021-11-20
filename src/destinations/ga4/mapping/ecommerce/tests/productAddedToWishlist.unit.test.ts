import { mockProductAddedToWishlist } from "../../../../../mocks/ecommerce";
import productAddedToWishlist from "../productAddedToWishlist";

it("creates parameters matching the snapshot", () => {
  const res = productAddedToWishlist(mockProductAddedToWishlist);

  expect(res).toMatchInlineSnapshot(`
    Object {
      "name": "add_to_wishlist",
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
