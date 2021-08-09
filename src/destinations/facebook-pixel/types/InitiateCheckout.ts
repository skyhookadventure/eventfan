import { GenericFacebookEvent } from "./shared/GenericFacebookEvent";

/**
 * When a person enters the checkout flow prior to completing the checkout flow. A person
 * clicks on a checkout button.
 */
export type InitiateCheckout = Pick<
  GenericFacebookEvent,
  | "content_category"
  | "content_ids"
  | "contents"
  | "currency"
  | "num_items"
  | "value"
>;
