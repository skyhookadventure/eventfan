/**
 * User removed a coupon from a cart or order
 */
export interface CouponRemoved {
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
