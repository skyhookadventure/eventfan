import { Ecommerce } from "../../../../sourceEvents/Events";
import { TEvent } from "../../../../types/TrackEvent";

export default function orderCompleted({
  properties,
}: Ecommerce.OrderCompleted): TEvent<"Order Completed"> {
  return {
    name: "Order Completed",
    properties: {
      // Drip requires the value in Zero Decimal form (cents not dollars)
      value: (properties.total || properties.revenue) * 100,
    },
  };
}
