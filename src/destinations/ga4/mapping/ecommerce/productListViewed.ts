import { Ecommerce } from "../../../../index";
import { TEvent } from "../../../../types/TrackEvent";
import { ViewItemList } from "../../types/events";
import { formatProduct } from "./checkoutStarted";

export default function productListViewed({
  properties,
}: Ecommerce.ProductListViewed): TEvent<"view_item_list", ViewItemList> {
  return {
    name: "view_item_list",
    properties: {
      item_list_id: properties.list_id,
      items: properties.products?.map(formatProduct),
    },
  };
}
