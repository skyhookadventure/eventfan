import { GenericFacebookEvent } from "./shared/GenericFacebookEvent";

/**
 * When payment information is added in the checkout flow. A person clicks on a save billing
 * information button.
 */
export type AddPaymentInfo = Pick<
  GenericFacebookEvent,
  | "content_category"
  | "content_ids"
  | "contents"
  | "currency"
  | "eventID"
  | "value"
>;
