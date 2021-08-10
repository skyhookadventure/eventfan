import { Product } from "./shared/Product";
import { TEvent } from "../../../types/TrackEvent";

interface CartViewedProps {
  /**
   * Cart ID associated with the product displayed
   */
  cart_id?: string;
  /**
   * Products displayed in the product list
   */
  products: Product[];
}

/**
 * User viewed their shopping cart
 */
export type CartViewed = TEvent<"Cart Viewed", CartViewedProps>;
