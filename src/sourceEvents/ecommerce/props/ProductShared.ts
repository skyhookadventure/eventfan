import { TEvent } from "../../../types/TrackEvent";

interface ProductSharedProps {
  /**
   * Brand of the product
   */
  brand?: string;
  /**
   * Product category being viewed
   */
  category?: string;
  /**
   * Image url of the product
   */
  image_url?: string;
  /**
   * Name of the product
   */
  name?: string;
  /**
   * Price of the product
   */
  price: number;
  /**
   * Database ID of the product
   */
  product_id: string;
  /**
   * Recipient of the sharing
   */
  recipient?: string;
  /**
   * Message that the sender sent
   */
  share_message?: string;
  /**
   * Method of sharing
   */
  share_via: string;
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
 * Shared a product with one or more friends
 */
export type ProductShared = TEvent<"Product Shared", ProductSharedProps>;
