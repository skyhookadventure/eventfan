import { mockProductViewed } from "../../../../../mocks/ecommerce";
import FacebookPixel from "../../../FacebookPixel";
import productViewed from "../productViewed";

it("creates parameters matching the snapshot", () => {
  const res = productViewed.call(
    new FacebookPixel({ pixelId: "pixelID" }),
    mockProductViewed
  );

  expect(res).toMatchInlineSnapshot(`
    Object {
      "name": "ViewContent",
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
