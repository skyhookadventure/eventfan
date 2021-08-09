import Content from "./shared/Content";

/**
 * When a person enters the checkout flow prior to completing the checkout flow. A person
 * clicks on a checkout button.
 */
export default interface InitiateCheckout {
  /**
   * city, don't use abbreviations
   */
  city?: string;
  /**
   * Category of the page/product.
   */
  content_category?: string;
  /**
   * Product IDs associated with the event, such as SKUs (e.g. ['ABC123', 'XYZ789']).
   */
  content_ids?: string[];
  /**
   * An array of JSON objects that contains the quantity and the International Article Number
   * (EAN) when applicable, or other product or content identifier(s). id and quantity are the
   * required fields. e.g. [{'id': 'ABC123', 'quantity': 2}, {'id': 'XYZ789', 'quantity': 2}].
   */
  contents?: Content[];
  /**
   * country, don't use abbreviations
   */
  country?: string;
  /**
   * The currency for the value specified.
   */
  currency?: string;
  /**
   * number of adults
   */
  num_adults?: number;
  /**
   * number of children
   */
  num_children?: number;
  /**
   * Used with InitiateCheckout event. The number of items when checkout was initiated.
   */
  num_items?: number;
  /**
   * region, don't use abbreviations
   */
  region?: string;
  /**
   * use YYYYMMDD, YYYY-MM-DD, YYYY-MM-DDThh:mmTZD or YYYY-MM-DDThh:mm:ssTZD
   */
  travel_end?: string;
  /**
   * Allows you to target people based on their travel dates (using a booking window).
   * Improves the landing experience with travel dates filled in (using template tags) use
   * YYYYMMDD, YYYY-MM-DD, YYYY-MM-DDThh:mmTZD or YYYY-MM-DDThh:mm:ssTZD
   */
  travel_start?: string;
  /**
   * The value of a user performing this event to the business.
   */
  value?: number;
}
