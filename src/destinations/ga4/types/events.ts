/**
 * @file GA4 Ecommerce Event Types
 *
 * https://developers.google.com/analytics/devguides/collection/ga4/reference/events
 * https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtag
 */

export interface Item {
  item_id: string;
  item_name: string;
  affiliation?: string;
  coupon?: string;
  currency?: string;
  discount?: number;
  index?: number;
  item_brand?: string;
  item_category?: string;
  item_category2?: string;
  item_category3?: string;
  item_category4?: string;
  item_category5?: string;
  item_list_id?: string;
  item_list_name?: string;
  item_variant?: string;
  location_id?: string;
  price?: number;
  quantity?: number;
}

export interface AddPaymentInfo {
  currency: string;
  value: number;
  coupon?: string;
  payment_type?: string;
  items: Item[];
}

export interface AddShippingInfo {
  currency: string;
  value: number;
  coupon?: string;
  shipping_tier?: string;
  items: Item[];
}

export interface AddToCart {
  currency: string;
  value: number;
  items: Item[];
}

export type AddToWishlist = AddToCart;

export type BeginCheckout = {
  currency: string;
  value: number;
  coupon?: string;
  items: Item[];
};

export interface EarnVirtualCurrency {
  virtual_currency_name?: string;
  value?: number;
}

export interface GenerateLead {
  currency?: string;
  value?: number;
}

export interface JoinGroup {
  group_id?: string;
}

export interface LevelEnd {
  level_name?: string;
  success?: boolean;
}

export interface LevelStart {
  level_name?: string;
}

export interface LevelUp {
  level?: number;
  character?: string;
}

export interface Login {
  method?: string;
}

export interface PostScore {
  score: number;
  level?: number;
  character?: string;
}

export interface Purchase {
  currency: string;
  transaction_id: string;
  value: number;
  affiliation?: string;
  coupon?: string;
  shipping?: number;
  tax?: number;
  items: Item[];
}

export type Refund = Purchase;

export type RemoveFromCart = AddToCart;

export interface Search {
  search_term: string;
}

export interface SelectContent {
  content_type?: string;
  item_id?: string;
}

export interface SelectItem {
  item_list_id?: string;
  item_list_name?: string;
  items: Item[];
}

export interface SelectPromotion {
  creative_name?: string;
  creative_slot?: string;
  location_id?: string;
  promotion_id?: string;
  promotion_name?: string;
  items: Item[];
}

export interface Share {
  method?: string;
  content_type?: string;
  item_id?: string;
}

export type SignUp = Login;

export interface SpendVirtualCurrency {
  value: number;
  virtual_currency_name: string;
  item_name?: string;
}

export interface UnlockAchievement {
  achievement_id: string;
}

export type ViewCart = AddToCart;

export type ViewItem = AddToCart;

export type ViewItemList = SelectItem;

export type ViewPromotion = SelectPromotion;
