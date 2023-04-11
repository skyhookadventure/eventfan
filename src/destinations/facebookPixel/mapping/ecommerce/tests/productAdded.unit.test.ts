import { mockProductAdded } from "../../../../../mocks/ecommerce";
import FacebookPixel from "../../../FacebookPixel";
import productAdded from "../productAdded";

it("creates parameters matching the snapshot", () => {
  const res = productAdded.call(
    new FacebookPixel({ pixelId: "pixelID" }),
    mockProductAdded
  );

  expect(res).toMatchInlineSnapshot(`
    {
      "name": "AddToCart",
      "properties": {
        "content_category": "Trip",
        "content_ids": [
          "productID",
        ],
        "content_name": "Product Name",
        "content_type": [
          "product",
        ],
        "contents": [
          {
            "id": "productID",
            "quantity": 1,
          },
        ],
        "value": 100,
      },
    }
  `);
});
