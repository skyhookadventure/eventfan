/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Ecommerce } from "../../../index";
import { TEvent } from "../../../types/TrackEvent";
import { Purchase } from "../types/events";
import { formatProduct } from "./checkoutStarted";

export default function orderCompleted({
  properties,
}: Ecommerce.OrderCompleted): TEvent<"purchase", Purchase> {
  return {
    name: "purchase",
    properties: {
      currency: properties.currency || "USD",
      transaction_id: properties.order_id,
      value: properties.total!,
      coupon: properties.coupon,
      shipping: properties.shipping,
      tax: properties.tax,
      items: properties.products.map(formatProduct),
    },
  };
}
