import { mockOrderCompleted } from "../../../../../mocks/index";
import FacebookPixel from "../../../FacebookPixel";
import { ContentType } from "../../../types/shared/GenericFacebookEvent";
import orderCompleted, { getContentTypes } from "../orderCompleted";

describe("getContentTypes", () => {
  it("defaults to product, with no items", () => {
    const res = getContentTypes(undefined, {});
    expect(res).toEqual([ContentType.PRODUCT]);
  });

  it("applies the mapping when specified", () => {
    const res = getContentTypes("Trip", {
      categoryToContent: [{ from: "Trip", to: ContentType.DESTINATION }],
    });
    expect(res).toEqual([ContentType.PRODUCT, ContentType.DESTINATION]);
  });
});

describe("orderCompleted", () => {
  it("creates parameters matching the snapshot", () => {
    const res = orderCompleted.call(
      new FacebookPixel({ pixelId: "pixelID" }),
      mockOrderCompleted
    );

    expect(res).toMatchInlineSnapshot(`
      Object {
        "name": "Purchase",
        "properties": Object {
          "content_ids": Array [
            "productID",
          ],
          "content_type": Array [
            "product",
          ],
          "contents": Array [
            Object {
              "id": "productID",
              "quantity": 1,
            },
          ],
          "currency": "GBP",
          "eventID": "orderID",
          "value": 200,
        },
      }
    `);
  });
});
