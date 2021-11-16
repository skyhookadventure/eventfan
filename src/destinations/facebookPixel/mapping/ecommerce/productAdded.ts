import { Ecommerce } from "../../../..";
import { TEvent } from "../../../../types/TrackEvent";
import FacebookPixel from "../../FacebookPixel";
import { AddToCart } from "../../types/AddToCart";
import { getContentTypes } from "./orderCompleted";

export default function productAdded(
  this: FacebookPixel,
  { properties }: Ecommerce.ProductAdded
): TEvent<"AddToCart", AddToCart> {
  const { config } = this;

  const quantity = properties.quantity || 1;

  return {
    name: "AddToCart",
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
