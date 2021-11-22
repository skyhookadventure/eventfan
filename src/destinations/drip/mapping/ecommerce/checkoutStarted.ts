import { Ecommerce } from "../../../../sourceEvents/Events";
import { TEvent } from "../../../../types/TrackEvent";

export default function checkoutStarted({
  properties,
}: Ecommerce.CheckoutStarted): TEvent<"Checkout Started"> {
  return {
    name: "Checkout Started",
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
      shipping: properties.shipping,
      tax: properties.tax,
    },
  };
}
