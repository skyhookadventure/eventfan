import { Ecommerce } from "../../../../sourceEvents/Events";
import { TEvent } from "../../../../types/TrackEvent";
import FacebookPixel from "../../FacebookPixel";
import { Purchase } from "../../types/Purchase";
import { ContentType } from "../../types/shared/GenericFacebookEvent";

/**
 * Get the Facebook content types
 */
export function getContentTypes(
  properties: Partial<Pick<Ecommerce.OrderCompleted["properties"], "products">>,
  config: Pick<FacebookPixel["config"], "categoryToContent">
): ContentType[] {
  const contentType = [ContentType.PRODUCT];
  if (properties.products?.[0].category) {
    const extraContentType = config.categoryToContent?.find(
      (i) => i.from === properties.products?.[0].category
    );
    if (extraContentType) contentType.push(extraContentType.to);
  }
  return contentType;
}

/**
 * Order completed mapping
 */
export default function orderCompleted(
  this: FacebookPixel,
  { properties }: Ecommerce.OrderCompleted
): TEvent<"Purchase", Purchase> {
  const { config } = this;

  return {
    name: "Purchase",
    properties: {
      content_ids: properties.products.map((product) => product.product_id),
      content_type: getContentTypes(properties, config),
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
