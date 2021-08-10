import { Product } from "./shared/Product";
import { TEvent } from "../../types/TrackEvent";

export interface ProductListViewedProps {
  /**
   * Product category being viewed
   */
  category?: string;
  /**
   * Product list being viewed
   */
  list_id?: string;
  /**
   * Products displayed in the product list
   */
  products: Product[];
}

/**
 * User viewed a product list or category
 */
export type ProductListViewed = TEvent<
  "Product List Viewed",
  ProductListViewedProps
>;
