/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Ecommerce } from "../../../index";
import { TEvent } from "../../../types/TrackEvent";
import { ViewItem } from "../types/events";
import { formatProduct } from "./checkoutStarted";

export default function productViewed({
  properties,
}: Ecommerce.ProductViewed): TEvent<"view_item", ViewItem> {
  return {
    name: "view_item",
    properties: {
      currency: properties.currency || "USD",
      value: properties.price!,
      items: [formatProduct(properties)],
    },
  };
}
