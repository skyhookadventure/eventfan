/**
 * User filtered a product list or category
 */
export interface ProductListFiltered {
  /**
   * Product category being viewed
   */
  category?: string;
  /**
   * Product filters that the customer is using
   */
  filters?: Filter[];
  /**
   * Product list being viewed
   */
  list_id?: string;
  /**
   * Products displayed in the product list
   */
  products: Product[];
  /**
   * Product sorting the customer is using
   */
  sorts?: Sort[];
}

export interface Filter {
  /**
   * ID of the filter type being used
   */
  type?: string;
  /**
   * ID of the selection chosen
   */
  value?: string;
}

export interface Product {
  /**
   * Product Brand displayed in the list
   */
  brand?: string;
  /**
   * Product Category displayed in the list
   */
  category?: string;
  /**
   * Coupon code associated with the product
   */
  coupon?: string;
  /**
   * Image url of the product in the list
   */
  image_url?: string;
  /**
   * Product Name displayed in the list
   */
  name?: string;
  /**
   * Position of product in the list
   */
  position?: number;
  /**
   * Product Price displayed in the list
   */
  price?: number;
  /**
   * Product ID displayed in the list
   */
  product_id: string;
  /**
   * Product quantity displayed in the list
   */
  quantity?: number;
  /**
   * Product SKU displayed in the list
   */
  sku?: string;
  /**
   * URL of the product page for product in the list
   */
  url?: string;
  /**
   * Product Variant displayed in the list
   */
  variant?: string;
}

export interface Sort {
  /**
   * ID of the sort type being used
   */
  type?: string;
  /**
   * ID of the selection type being used
   */
  value?: string;
}
