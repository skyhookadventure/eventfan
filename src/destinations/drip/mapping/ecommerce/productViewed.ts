import { Ecommerce } from "../../../../index";
import { TEvent } from "../../../../types/TrackEvent";
import { ViewedAProduct } from "../../types/DripJsAPI";

export default function productViewed({
  properties,
}: Ecommerce.ProductViewed): TEvent<"Viewed A Product", ViewedAProduct> {
  return {
    name: "Viewed A Product",
    properties: {
      product_id: properties.product_id,
      // Drip requires this field to duplicate the product_id if there is no variant id
      product_variant_id: properties.variant || properties.product_id,
      sku: properties.sku,
      name: properties.name,
      brand: properties.brand,
      categories: properties.category ? [properties.category] : undefined,
      // Drip requires the value in Zero Decimal form (cents not dollars)
      price: properties.price ? properties.price * 100 : undefined,
    },
  };
}
