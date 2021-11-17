import { Ecommerce } from "../../../../sourceEvents/Events";
import { TEvent } from "../../../../types/TrackEvent";
import FacebookPixel from "../../FacebookPixel";
import { InitiateCheckout } from "../../types/InitiateCheckout";

export default function checkoutStarted(
  this: FacebookPixel,
  { properties }: Ecommerce.CheckoutStarted
): TEvent<"InitiateCheckout", InitiateCheckout> {
  return {
    name: "InitiateCheckout",
    properties: {
      content_ids: properties.products.map((product) => product.product_id),
      contents: properties.products.map((product) => ({
        id: product.product_id,
        quantity: product.quantity || 1, // Default quantity to 1
      })),
      currency: properties.currency || "USD", // Default currency to USD
      eventID: properties.order_id, // Set the deduplication ID as the order ID
      // Value is required for this event to be accepted, but it will fail silently without
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      value: properties.total!,
    },
  };
}
