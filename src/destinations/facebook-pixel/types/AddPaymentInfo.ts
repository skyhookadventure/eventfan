import Content from "./shared/Content";

/**
 * When payment information is added in the checkout flow. A person clicks on a save billing
 * information button.
 */
export default interface AddPaymentInfo {
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
   * The currency for the value specified.
   */
  currency?: string;
  /**
   * The value of a user performing this event to the business.
   */
  value?: number;
}
