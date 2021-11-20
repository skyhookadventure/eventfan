import { mockProductListViewed } from "../../../../../mocks/ecommerce";
import FacebookPixel from "../../../FacebookPixel";
import productListViewed from "../productListViewed";

it("creates parameters matching the snapshot", () => {
  const res = productListViewed.call(
    new FacebookPixel({ pixelId: "pixelID" }),
    mockProductListViewed
  );

  expect(res).toMatchInlineSnapshot(`
    Object {
      "name": "ViewContent",
      "properties": Object {
        "content_category": "category",
        "content_type": Array [
          "product",
        ],
        "contents": Array [
          Object {
            "id": "productID",
            "quantity": 1,
          },
        ],
      },
    }
  `);
});
