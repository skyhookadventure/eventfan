/**
 * User completed a checkout step
 */
export interface CheckoutStepCompleted {
  /**
   * Checkout transaction ID
   */
  checkout_id?: string;
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
