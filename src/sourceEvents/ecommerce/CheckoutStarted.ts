import { Product } from "./shared/Product";
import { TEvent } from "../../types/TrackEvent";

interface CheckoutStartedProps {
  /**
   * Store or affiliation from which this transaction occurred
   */
  affiliation?: string;
  /**
   * Coupon code associated with the product
   */
  coupon?: string;
  /**
   * Currency code associated with the transaction
   */
  currency?: string;
  /**
   * Total discount associated with the transaction
   */
  discount?: number;
  /**
   * Order/transaction ID
   */
  order_id: string;
  /**
   * Products displayed in the product list
   */
  products: Product[];
  /**
   * Revenue ($) associated with the transaction
   */
  revenue: number;
  /**
   * Shipping cost associated with the transaction
   */
  shipping?: number;
  /**
   * Total tax associated with the transaction
   */
  tax?: number;
  /**
   * Revenue with discounts and coupons added
   */
  total?: number;
}

/**
 * User initiated the order process (a transaction is created)
 */
export type CheckoutStarted = TEvent<"Checkout Started", CheckoutStartedProps>;
