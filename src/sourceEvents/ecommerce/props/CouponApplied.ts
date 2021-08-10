import { TEvent } from "../../../types/TrackEvent";

interface CouponAppliedProps {
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
   * Total discount associated with the transaction
   */
  discount?: number;
  /**
   * Order/transaction ID
   */
  order_id: string;
}

/**
 * Coupon was applied on a user’s shopping cart or order
 */
export type CouponApplied = TEvent<"Coupon Applied", CouponAppliedProps>;
