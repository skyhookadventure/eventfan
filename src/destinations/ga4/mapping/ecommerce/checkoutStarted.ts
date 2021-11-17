/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Ecommerce } from "../../../../index";
import { TEvent } from "../../../../types/TrackEvent";
import { BeginCheckout, Item } from "../../types/events";

export function formatProduct(
  product: Ecommerce.CheckoutStarted["properties"]["products"][0]
): Item {
  return {
    item_id: product.product_id,
    item_name: product.name!,
    price: product.price,
    quantity: product.quantity,
  };
}

export default function checkoutStarted({
  properties,
}: Ecommerce.CheckoutStarted): TEvent<"begin_checkout", BeginCheckout> {
  return {
    name: "begin_checkout",
    properties: {
      currency: properties.currency || "USD",
      value: properties.total!,
      coupon: properties.coupon,
      items: properties.products.map(formatProduct),
    },
  };
}
