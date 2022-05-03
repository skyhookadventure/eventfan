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
        "product_1_category": "Trip",
        "product_1_currency": "GBP",
        "product_1_image_url": "http://example.com/image.jpg",
        "product_1_name": "Product Name",
        "product_1_price": 100,
        "product_1_product_id": "productID",
        "product_1_quantity": 1,
        "product_1_sku": "sku",
        "product_1_url": "http://example.com/productID",
        "product_1_variant": "variant",
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
