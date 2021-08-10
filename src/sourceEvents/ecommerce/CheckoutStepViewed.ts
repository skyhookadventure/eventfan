import { TEvent } from "../../types/TrackEvent";

interface CheckoutStepViewedProps {
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

/**
 * User viewed a checkout step
 */
export type CheckoutStepViewed = TEvent<
  "Checkout Step Viewed",
  CheckoutStepViewedProps
>;
