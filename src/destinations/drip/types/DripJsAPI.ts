/**
 * Identify
 *
 * https://developer.drip.com/#identifying-visitors
 *
 * Note Drip also sets some custom fields so we have put them here as well.
 */
export interface DripIdentity {
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  new_email?: string;
  user_id?: string;
  tags?: Array<string>;
  remove_tags?: Array<string>;
  prospect?: boolean;
  eu_consent?: "granted" | "denied";
  eu_consent_message?: string;
  success?: () => void;
  failure?: () => void;
}

/**
 * Viewed a product
 *
 * https://developer.drip.com/#tracking-product-views
 */
export interface ViewedAProduct {
  /**
   * A unique, internal id for the product (generally the primary key generated
   * by the ecommerce platform). (Note: this field is used by segmentation.)
   */
  product_id: string;

  /**
   * A unique identifier for the specific product variant from the provider. For
   * example, a t-shirt may have one product_id, but several product_variant_ids
   * for sizes and colors. If a product does not have multiple variants and you do
   * not have a variant identifier in your system, repeat the product_id here.
   */
  product_variant_id: string;

  sku?: string;
  name?: string;
  brand?: string;
  categories?: Array<string>;
  price?: number;

  /**
   * The String time at which the event occurred in ISO-8601 format. Defaults to
   * the current time.
   */
  occurred_at?: string;

  success?: () => void;
  failure?: () => void;
}

export interface DripWindowObject {
  account: string;
}
