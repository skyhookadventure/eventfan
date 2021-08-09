import { Destination } from "./shared/Destination";
import { GenericFacebookEvent } from "./shared/GenericFacebookEvent";

/**
 * 	When a purchase is made or checkout flow is completed.
 *
 * A person has finished the purchase or checkout flow and lands on thank you or confirmation page.
 */
export type Purchase = Pick<
  GenericFacebookEvent,
  | "content_category"
  | "content_ids"
  | "content_name"
  | "content_type"
  | "contents"
  | "num_items"
> &
  Required<Pick<GenericFacebookEvent, "currency" | "value">> &
  Destination;
