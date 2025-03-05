 
import { Ecommerce } from "../../../../index";
import { TEvent } from "../../../../types/TrackEvent";
import { Search } from "../../types/events";

export default function productsSearched({
  properties,
}: Ecommerce.ProductsSearched): TEvent<"Search", Search> {
  return {
    name: "Search",
    properties: {
      search_term: properties.query!,
    },
  };
}
