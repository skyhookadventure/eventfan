import { Ecommerce } from "../../../../sourceEvents/Events";
import { TEvent } from "../../../../types/TrackEvent";

export default function orderCompleted({
  properties,
}: Ecommerce.OrderCompleted): TEvent<"Order Completed"> {
  // Note that Drip's version of Liquid templating language doesn't seem to support arrays, so in addition to passing
  // all products in the `products` property we we also pass properties called `product_X`. This enables you to take
  // images etc from each product in your campaign.
  const productsNumbered: any = {};
  properties.products?.forEach((product, key) => {
    productsNumbered[`product_${key + 1}`] = product;
  });

  return {
    name: "Order Completed",
    properties: {
      // Drip requires the value in Zero Decimal form (cents not dollars)
      value: (properties.total || properties.revenue) * 100,
      // Set the other properties available as custom properties
      affiliation: properties.affiliation,
      coupon: properties.coupon,
      currency: properties.currency,
      discount: properties.discount,
      order_id: properties.order_id,
      products: properties.products?.map((i) => ({
        price: i.price ? i.price * 100 : undefined,
        ...i,
      })),
      ...productsNumbered,
      shipping: properties.shipping,
      tax: properties.tax,
    },
  };
}
