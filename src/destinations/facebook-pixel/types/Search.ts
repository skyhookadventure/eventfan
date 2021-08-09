import Content from "./shared/Content";

/**
 * When a search is made. A person searches for a product on your website.
 */
export default interface Search {
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
   * number of adults
   */
  num_adults?: number;
  /**
   * number of children
   */
  num_children?: number;
  /**
   * region, don't use abbreviations
   */
  region?: string;
  /**
   * Used with the Search event. The string entered by the user for the search.
   */
  search_string?: string;
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
