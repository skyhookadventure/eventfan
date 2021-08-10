import { TEvent } from "../../../types/TrackEvent";

interface ProductsSearchedProps {
  /**
   * Query the user searched with
   */
  query?: string;
}

/**
 * User searched for products
 */
export type ProductsSearched = TEvent<
  "Products Searched",
  ProductsSearchedProps
>;
