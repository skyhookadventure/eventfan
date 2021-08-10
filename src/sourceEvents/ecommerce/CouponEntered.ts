import { TEvent } from "../../../types/TrackEvent";

interface CouponEnteredProps {
  /**
   * Cart ID associated with the product displayed
   */
  cart_id?: string;
  /**
   * ID of the coupon
   */
  coupon_id: string;
  /**
   * Name of the coupon
   */
  coupon_name?: string;
  /**
   * Order/transaction ID
   */
  order_id: string;
}

/**
 * User entered a coupon on a shopping cart or order
 */
export type CouponEntered = TEvent<"Coupon Entered", CouponEnteredProps>;
