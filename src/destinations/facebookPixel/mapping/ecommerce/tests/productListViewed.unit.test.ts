import { mockProductListViewed } from "../../../../../mocks/ecommerce";
import FacebookPixel from "../../../FacebookPixel";
import productListViewed from "../productListViewed";

it("creates parameters matching the snapshot", () => {
  const res = productListViewed.call(
    new FacebookPixel({ pixelId: "pixelID" }),
    mockProductListViewed
  );

  expect(res).toMatchInlineSnapshot(`
    {
      "name": "ViewContent",
      "properties": {
        "content_category": "category",
        "content_type": [
          "product",
        ],
        "contents": [
          {
            "id": "productID",
            "quantity": 1,
          },
        ],
      },
    }
  `);
});
