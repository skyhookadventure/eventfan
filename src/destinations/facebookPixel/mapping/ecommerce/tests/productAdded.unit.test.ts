import { mockProductAdded } from "../../../../../mocks/ecommerce";
import FacebookPixel from "../../../FacebookPixel";
import productAdded from "../productAdded";

it("creates parameters matching the snapshot", () => {
  const res = productAdded.call(
    new FacebookPixel({ pixelId: "pixelID" }),
    mockProductAdded
  );

  expect(res).toMatchInlineSnapshot(`
    Object {
      "name": "AddToCart",
      "properties": Object {
        "content_category": "Trip",
        "content_ids": Array [
          "productID",
        ],
        "content_name": "Product Name",
        "content_type": Array [
          "product",
        ],
        "contents": Array [
          Object {
            "id": "productID",
            "quantity": 1,
          },
        ],
        "value": 100,
      },
    }
  `);
});
