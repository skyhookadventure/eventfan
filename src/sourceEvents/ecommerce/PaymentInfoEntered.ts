import { TEvent } from "../../types/TrackEvent";
import { Product } from "./shared/Product";

export interface PaymentInfoEnteredProps {
  /**
   * Checkout transaction ID
   */
  checkout_id?: string;
  /**
   * Order/transaction ID
   */
  order_id: string;
  /**
   * String representing the payment method chosen
   */
  payment_method?: string;
  /**
   * String representing the shipping method chosen
   */
  shipping_method?: string;
  /**
   * Number representing a step in the checkout process
   */
  step?: number;
  /**
   * Revenue ($) associated with the transaction
   *
   * Not within the official Segment spec but useful.
   */
  revenue?: number;
  /**
   * Currency code associated with the transaction
   *
   * Not within the official Segment spec but useful.
   */
  currency?: string;
  /**
   * Products displayed in the product list
   *
   * Not within the official Segment spec but useful.
   */
  products?: Product[];
}

/**
 * User added payment information
 */
export type PaymentInfoEntered = TEvent<
  "Payment Info Entered",
  PaymentInfoEnteredProps
>;
