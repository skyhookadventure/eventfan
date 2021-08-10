import { Destination } from "./shared/Destination";
import { GenericFacebookEvent } from "./shared/GenericFacebookEvent";

/**
 * A visit to a web page you care about (for example, a product page or landing page).
 * ViewContent tells you if someone visits a web page's URL, but not what they see or do on
 * that page. A person lands on a product details page.
 */
export type ViewContent = Pick<
  GenericFacebookEvent,
  | "content_category"
  | "content_ids"
  | "content_name"
  | "content_type"
  | "contents"
  | "currency"
  | "value"
> &
  Destination;
