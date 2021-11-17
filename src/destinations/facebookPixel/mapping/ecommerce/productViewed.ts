import { Ecommerce } from "../../../../index";
import { TEvent } from "../../../../types/TrackEvent";
import FacebookPixel from "../../FacebookPixel";
import { ViewContent } from "../../types/ViewContent";
import { getContentTypes } from "./orderCompleted";

export default function productViewed(
  this: FacebookPixel,
  { properties }: Ecommerce.ProductViewed
): TEvent<"ViewContent", ViewContent> {
  const { config } = this;

  const quantity = properties.quantity || 1;

  return {
    name: "ViewContent",
    properties: {
      content_ids: [properties.product_id],
      content_type: getContentTypes(properties.category, config),
      content_name: properties.name,
      content_category: properties.category,
      value: properties.price * quantity,
      contents: [
        {
          id: properties.product_id,
          quantity,
        },
      ],
    },
  };
}
