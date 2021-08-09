/**
 * Generic Facebook Event
 *
 * Most pixel events use similar parameters, so we can declare them once and
 * then pick from them.
 *
 * https://developers.facebook.com/docs/facebook-pixel/reference
 */
export interface GenericFacebookEvent {
  /**
   * Category of the page/product.
   */
  content_category?: string;

  /**
   * Product IDs associated with the event, such as SKUs (e.g. ['ABC123', 'XYZ789']).
   */
  content_ids?: string[];

  /**
   * Name of the page/product.
   */
  content_name?: string;

  /**
   * Either product or product_group based on the content_ids or contents being passed. If the
   * IDs being passed in content_ids or contents parameter are IDs of products then the value
   * should be product. If product group IDs are being passed, then the value should be
   * product_group.
   */
  content_type?: ContentType;

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
   * Used with InitiateCheckout event. The number of items when checkout was initiated.
   */
  num_items?: number;

  /**
   * Predicted lifetime value of a subscriber as defined by the advertiser and expressed as an exact value.
   */
  predicted_ltv?: number;

  /**
   * Used with the Search event. The string entered by the user for the search.
   */
  search_string?: string;

  /**
   * Used with the CompleteRegistration event, to show the status of the registration.
   */
  status?: boolean;

  /**
   * The value of a user performing this event to the business.
   */
  value?: number;
}

/**
 * Either product or product_group based on the content_ids or contents being passed. If the
 * IDs being passed in content_ids or contents parameter are IDs of products then the value
 * should be product. If product group IDs are being passed, then the value should be
 * product_group.
 */
export enum ContentType {
  Destination = "destination",
  Flight = "flight",
  Hotel = "hotel",
  Product = "product",
  ProductGroup = "product_group",
}

/**
 * Content (product)
 */
export interface Content {
  id: string;
  quantity: number;
}
