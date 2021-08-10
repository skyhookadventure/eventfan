import { TEvent } from "../../types/TrackEvent";

interface PromotionViewedProps {
  /**
   * Description of promotion's creative
   */
  promotion_creative?: string;
  /**
   * ID of the promotion
   */
  promotion_id?: string;
  /**
   * Name of the promotion
   */
  promotion_name?: string;
  /**
   * Position of the promotion
   */
  promotion_position?: string;
}

/**
 * User viewed promotion
 */
export type PromotionViewed = TEvent<"Promotion Viewed", PromotionViewedProps>;
