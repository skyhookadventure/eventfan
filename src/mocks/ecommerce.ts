/* eslint-disable import/prefer-default-export */
import {
  CheckoutStarted,
  OrderCompleted,
  ProductAdded,
  ProductListViewed,
  ProductsSearched,
  ProductViewed,
} from "../sourceEvents/ecommerce";

export const mockProductViewed: ProductViewed = {
  name: "Product Viewed",
  properties: {
    category: "Trip",
    name: "Product Name",
    price: 100.0,
    product_id: "productID",
    quantity: 1,
    sku: "sku",
    variant: "variant",
  },
};

export const mockProductListViewed: ProductListViewed = {
  name: "Product List Viewed",
  properties: {
    category: "category",
    list_id: "list_id",
    products: [mockProductViewed.properties],
  },
};

export const mockProductAdded: ProductAdded = {
  name: "Product Added",
  properties: mockProductViewed.properties,
};

export const mockProductSearched: ProductsSearched = {
  name: "Products Searched",
  properties: {
    query: "Query string",
  },
};

export const mockCheckoutStarted: CheckoutStarted = {
  name: "Checkout Started",
  properties: {
    currency: "GBP",
    order_id: "orderID",
    products: [mockProductViewed.properties],
    revenue: 100.0,
    total: 200.0,
  },
};

export const mockOrderCompleted: OrderCompleted = {
  name: "Order Completed",
  properties: mockCheckoutStarted.properties,
};
