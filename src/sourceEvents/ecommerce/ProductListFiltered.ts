import { Product } from "./shared/Product";
import { TEvent } from "../../types/TrackEvent";

interface ProductListFilteredProps {
  /**
   * Product category being viewed
   */
  category?: string;
  /**
   * Product filters that the customer is using
   */
  filters?: Filter[];
  /**
   * Product list being viewed
   */
  list_id?: string;
  /**
   * Products displayed in the product list
   */
  products: Product[];
  /**
   * Product sorting the customer is using
   */
  sorts?: Sort[];
}

export interface Filter {
  /**
   * ID of the filter type being used
   */
  type?: string;
  /**
   * ID of the selection chosen
   */
  value?: string;
}

export interface Sort {
  /**
   * ID of the sort type being used
   */
  type?: string;
  /**
   * ID of the selection type being used
   */
  value?: string;
}

/**
 * User filtered a product list or category
 */
export type ProductListFiltered = TEvent<
  "Product List Filtered",
  ProductListFilteredProps
>;
