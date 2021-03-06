import { TEvent } from "../../types/TrackEvent";

interface ProductAddedProps {
  /**
   * Brand of the product
   */
  brand?: string;
  /**
   * Cart ID associated with the product displayed
   */
  cart_id?: string;
  /**
   * Product category being viewed
   */
  category?: string;
  /**
   * Coupon code associated with the product
   */
  coupon?: string;
  /**
   * Added currency as well, as it is needed by e.g. Gtag
   */
  currency?: string;
  /**
   * Image url of the product
   */
  image_url?: string;
  /**
   * Name of the product
   */
  name?: string;
  /**
   * Position of product in the list
   */
  position?: number;
  /**
   * Price of the product
   */
  price: number;
  /**
   * Database ID of the product
   */
  product_id: string;
  /**
   * Quantity of the product
   */
  quantity?: number;
  /**
   * Sku of the product
   */
  sku?: string;
  /**
   * URL of the product page for product
   */
  url?: string;
  /**
   * Variant of the product
   */
  variant?: string;
}

/**
 * User added a product to their shopping cart
 */
export type ProductAdded = TEvent<"Product Added", ProductAddedProps>;
