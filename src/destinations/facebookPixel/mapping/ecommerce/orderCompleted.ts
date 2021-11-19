import { Ecommerce } from "../../../../sourceEvents/Events";
import { TEvent } from "../../../../types/TrackEvent";
import FacebookPixel from "../../FacebookPixel";
import { Purchase } from "../../types/Purchase";
import { ContentType } from "../../types/shared/GenericFacebookEvent";

/**
 * Get the Facebook content types
 */
export function getContentTypes(
  category: Ecommerce.OrderCompleted["properties"]["products"][0]["category"],
  config: Pick<FacebookPixel["config"], "categoryToContent">
): ContentType[] {
  const contentType = [ContentType.PRODUCT];
  if (category) {
    const extraContentType = config.categoryToContent?.find(
      (i) => i.from === category
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
