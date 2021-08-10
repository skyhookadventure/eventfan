import { TEvent } from "../../../types/TrackEvent";

interface PromotionClickedProps {
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
 * User clicked on promotion
 */
export type PromotionClicked = TEvent<
  "Promotion Clicked",
  PromotionClickedProps
>;
