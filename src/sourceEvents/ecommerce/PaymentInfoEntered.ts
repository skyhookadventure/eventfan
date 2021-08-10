import { TEvent } from "../../types/TrackEvent";

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
}

/**
 * User added payment information
 */
export type PaymentInfoEntered = TEvent<
  "Payment Info Entered",
  PaymentInfoEnteredProps
>;
