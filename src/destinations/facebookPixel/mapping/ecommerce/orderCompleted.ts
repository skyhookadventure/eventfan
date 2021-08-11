import { OrderCompleted } from "../../../../sourceEvents/ecommerce/OrderCompleted";
import { TEvent } from "../../../../types/TrackEvent";
import { Purchase } from "../../types/Purchase";
import { ContentType } from "../../types/shared/GenericFacebookEvent";

export default function orderCompleted({
  props,
}: OrderCompleted): TEvent<"Purchase", Purchase> {
  return {
    eventName: "Purchase",
    props: {
      content_ids: props.products.map((product) => product.product_id),
      content_type: ContentType.PRODUCT,
      contents: props.products.map((product) => ({
        id: product.product_id,
        quantity: product.quantity || 1, // Default quantity to 1
      })),
      currency: props.currency || "USD", // Default currency to USD
      eventID: props.order_id, // Set the deduplication ID as the order ID
      // Value is required for this event to be accepted, but it will fail silently without
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      value: props.total!,
    },
  };
}
