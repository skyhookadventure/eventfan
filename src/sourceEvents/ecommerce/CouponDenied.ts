import { TEvent } from "../../types/TrackEvent";

interface CouponDeniedProps {
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
  /**
   * Reason the coupon was denied
   */
  reason?: string;
}

/**
 * Coupon was denied from a user’s shopping cart or order
 */
export type CouponDenied = TEvent<"Coupon Denied", CouponDeniedProps>;
