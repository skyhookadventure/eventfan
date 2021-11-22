import { mockCheckoutStarted } from "../../../../../mocks/ecommerce";
import checkoutStarted from "../checkoutStarted";

it("creates parameters matching the snapshot", () => {
  const res = checkoutStarted(mockCheckoutStarted);

  expect(res).toMatchInlineSnapshot(`
    Object {
      "name": "Checkout Started",
      "properties": Object {
        "affiliation": undefined,
        "coupon": undefined,
        "currency": "GBP",
        "discount": undefined,
        "order_id": "orderID",
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
