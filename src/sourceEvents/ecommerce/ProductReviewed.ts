import { TEvent } from "../../types/TrackEvent";

interface ProductReviewedProps {
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

/**
 * User reviewed a product
 */
export type ProductReviewed = TEvent<"Product Reviewed", ProductReviewedProps>;
