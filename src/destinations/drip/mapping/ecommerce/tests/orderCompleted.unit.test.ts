import { mockOrderCompleted } from "../../../../../mocks/index";
import orderCompleted from "../orderCompleted";

it("creates parameters matching the snapshot", () => {
  const res = orderCompleted(mockOrderCompleted);

  expect(res).toMatchInlineSnapshot(`
    Object {
      "name": "Order Completed",
      "properties": Object {
        "affiliation": undefined,
        "coupon": undefined,
        "currency": "GBP",
        "discount": undefined,
        "order_id": "orderID",
        "product_1": Object {
          "category": "Trip",
          "currency": "GBP",
          "image_url": "http://example.com/image.jpg",
          "name": "Product Name",
          "price": 100,
          "product_id": "productID",
          "quantity": 1,
          "sku": "sku",
          "url": "http://example.com/productID",
          "variant": "variant",
        },
        "products": Array [
          Object {
            "category": "Trip",
            "currency": "GBP",
            "image_url": "http://example.com/image.jpg",
            "name": "Product Name",
            "price": 100,
            "product_id": "productID",
            "quantity": 1,
            "sku": "sku",
            "url": "http://example.com/productID",
            "variant": "variant",
          },
        ],
        "shipping": undefined,
        "tax": undefined,
        "value": 20000,
      },
    }
  `);
});
