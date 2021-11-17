/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Ecommerce } from "../../../../index";
import { TEvent } from "../../../../types/TrackEvent";
import { AddToCart } from "../../types/events";
import { formatProduct } from "./checkoutStarted";

export default function productAdded({
  properties,
}: Ecommerce.ProductAdded): TEvent<"add_to_cart", AddToCart> {
  return {
    name: "add_to_cart",
    properties: {
      currency: properties.currency || "USD",
      value: properties.price!,
      items: [formatProduct(properties)],
    },
  };
}
