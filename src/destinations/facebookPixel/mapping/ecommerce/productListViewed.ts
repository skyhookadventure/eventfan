import { Ecommerce } from "../../../../index";
import { TEvent } from "../../../../types/TrackEvent";
import FacebookPixel from "../../FacebookPixel";
import { ViewContent } from "../../types/ViewContent";
import { getContentTypes } from "./orderCompleted";

export default function productListViewed(
  this: FacebookPixel,
  { properties }: Ecommerce.ProductListViewed
): TEvent<"ViewContent", ViewContent> {
  const { config } = this;

  return {
    name: "ViewContent",
    properties: {
      content_type: getContentTypes(properties.category, config),
      content_category: properties.category,
      contents: properties.products.map((product) => ({
        id: product.product_id,
        quantity: 1, // Required property for Facebook Pixel (but meaningless in this context)
      })),
    },
  };
}
