import { Destination } from "./shared/Destination";
import { GenericFacebookEvent } from "./shared/GenericFacebookEvent";

export type AddToCart = Pick<
  GenericFacebookEvent,
  | "content_category"
  | "content_ids"
  | "content_name"
  | "content_type"
  | "contents"
  | "currency"
  | "eventID"
  | "value"
> &
  Destination;
