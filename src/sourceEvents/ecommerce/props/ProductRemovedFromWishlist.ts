import { TEvent } from "../../../types/TrackEvent";

interface ProductRemovedFromWishlistProps {
  /**
   * Brand of the product
   */
  brand?: string;
  /**
   * Product category being viewed
   */
  category?: string;
  /**
   * Coupon code associated with the product
   */
  coupon?: string;
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
  /**
   * Wishlist ID to which the product was added
   */
  wishlist_id: string;
  /**
   * Wishlist name to which the product was added
   */
  wishlist_name?: string;
}

/**
 * User removed a product from the wish list
 */
export type ProductRemovedFromWishlist = TEvent<
  "Product Removed From Wishlist",
  ProductRemovedFromWishlistProps
>;
