import { OrderCompleted } from "../../../../../sourceEvents/standard/ecommerce/order-completed";
import { DestinationEvent } from "../../../../DestinationEvent";
import { Purchase } from "../../types/Purchase";
import { ContentType } from "../../types/shared/GenericFacebookEvent";

export default function orderCompleted(
  props: OrderCompleted
): DestinationEvent<Purchase> {
  return {
    name: "Purchase",
    properties: {
      content_ids: props.products.map((product) => product.product_id),
      content_type: ContentType.PRODUCT,
      contents: props.products.map((product) => ({
        id: product.product_id,
        quantity: product.quantity || 1, // Default quantity to 1
      })),
      currency: props.currency || "USD", // Default currency to USD
      // Value is required for this event to be accepted, but it will fail silently without
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      value: props.total!,
    },
  };
}
