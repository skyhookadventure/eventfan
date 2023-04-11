import { mockProductViewed } from "../../../../../mocks/ecommerce";
import FacebookPixel from "../../../FacebookPixel";
import productViewed from "../productViewed";

it("creates parameters matching the snapshot", () => {
  const res = productViewed.call(
    new FacebookPixel({ pixelId: "pixelID" }),
    mockProductViewed
  );

  expect(res).toMatchInlineSnapshot(`
    {
      "name": "ViewContent",
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
