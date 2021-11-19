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
    },
  };
}
