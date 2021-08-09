/**
 * Shared the cart with one or more friends
 */
export interface CartShared {
  /**
   * Cart ID associated with the product displayed
   */
  cart_id?: string;
  /**
   * Products displayed in the product list
   */
  products: Product[];
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
}

export interface Product {
  /**
   * Product ID displayed in the list
   */
  product_id: string;
}
