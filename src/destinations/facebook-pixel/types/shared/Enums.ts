/* eslint-disable import/prefer-default-export */
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
