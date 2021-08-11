import { Destination } from "./shared/Destination";
import { GenericFacebookEvent } from "./shared/GenericFacebookEvent";

/**
 * When a search is made. A person searches for a product on your website.
 */
export type Search = Pick<
  GenericFacebookEvent,
  | "content_category"
  | "content_ids"
  | "contents"
  | "currency"
  | "eventID"
  | "search_string"
  | "value"
> &
  Destination;
