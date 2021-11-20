import { Ecommerce } from "../../../../sourceEvents/Events";
import { TEvent } from "../../../../types/TrackEvent";
import FacebookPixel from "../../FacebookPixel";
import { InitiateCheckout } from "../../types/InitiateCheckout";
import { getContentTypes } from "./orderCompleted";

export default function checkoutStarted(
  this: FacebookPixel,
  { properties }: Ecommerce.CheckoutStarted
): TEvent<"InitiateCheckout", InitiateCheckout> {
  const { config } = this;

  return {
    name: "InitiateCheckout",
    properties: {
      content_ids: properties.products.map((product) => product.product_id),
      content_type: getContentTypes(properties.products[0].category, config),
      contents: properties.products.map((product) => ({
        id: product.product_id,
        quantity: product.quantity || 1, // Default quantity to 1
      })),
      currency: properties.currency || "USD", // Default currency to USD
      eventID: properties.order_id, // Set the deduplication ID as the order ID
      value: properties.total || properties.revenue,
    },
  };
}
