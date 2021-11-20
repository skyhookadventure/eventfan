/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Ecommerce } from "../../../../index";
import { TEvent } from "../../../../types/TrackEvent";
import { AddToWishlist } from "../../types/events";
import { formatProduct } from "./checkoutStarted";

export default function productAddedToWishlist({
  properties,
}: Ecommerce.ProductAddedToWishlist): TEvent<"add_to_wishlist", AddToWishlist> {
  return {
    name: "add_to_wishlist",
    properties: {
      currency: properties.currency || "USD",
      value: properties.price!,
      items: [formatProduct(properties)],
    },
  };
}
