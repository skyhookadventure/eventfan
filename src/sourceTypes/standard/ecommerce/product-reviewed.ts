/**
 * User reviewed a product
 */
export interface ProductReviewed {
  /**
   * Database ID of the product
   */
  product_id: string;
  /**
   * Star rating
   */
  rating?: number;
  /**
   * Content of the review
   */
  review_body?: string;
  /**
   * ID of the review posted
   */
  review_id?: string;
}
