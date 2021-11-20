import {
  CartShared,
  CartViewed,
  CheckoutStarted,
  CheckoutStepCompleted,
  CheckoutStepViewed,
  OrderCompleted,
  OrderRefunded,
  PaymentInfoEntered,
  ProductAdded,
  ProductClicked,
  ProductListViewed,
  ProductRemoved,
  ProductShared,
  ProductsSearched,
  ProductViewed,
  PromotionClicked,
  PromotionViewed,
} from "../sourceEvents/ecommerce";

/**
 * Helper Mock Product
 */
const mockProduct: ProductViewed["properties"] = {
  category: "Trip",
  name: "Product Name",
  price: 100.0,
  product_id: "productID",
  quantity: 1,
  sku: "sku",
  variant: "variant",
};

export const mockCartShared: CartShared = {
  name: "Cart Shared",
  properties: {
    cart_id: "cartID",
    products: [mockProduct],
    recipient: "recipient",
    share_message: "share message",
    share_via: "Facebook",
  },
};

export const mockCartViewed: CartViewed = {
  name: "Cart Viewed",
  properties: {
    cart_id: "cartID",
    products: [mockProduct],
  },
};

export const mockCheckoutStarted: CheckoutStarted = {
  name: "Checkout Started",
  properties: {
    currency: "GBP",
    order_id: "orderID",
    products: [mockProduct],
    revenue: 100.0,
    total: 200.0,
  },
};

export const mockCheckoutStepCompleted: CheckoutStepCompleted = {
  name: "Checkout Step Completed",
  properties: {
    checkout_id: "checkoutID",
    payment_method: "Credit Card",
    shipping_method: "shippingMethod",
    step: 1,
  },
};

export const mockCheckoutStepViewed: CheckoutStepViewed = {
  name: "Checkout Step Viewed",
  properties: mockCheckoutStepCompleted.properties,
};

export const mockOrderCompleted: OrderCompleted = {
  name: "Order Completed",
  properties: mockCheckoutStarted.properties,
};

export const mockOrderRefunded: OrderRefunded = {
  name: "Order Refunded",
  properties: mockCheckoutStarted.properties,
};

export const mockPaymentInfoEntered: PaymentInfoEntered = {
  name: "Payment Info Entered",
  properties: {
    currency: "GBP",
    order_id: "orderID",
    products: [mockProduct],
    revenue: 100.0,
  },
};

export const mockProductAdded: ProductAdded = {
  name: "Product Added",
  properties: mockProduct,
};

export const mockProductClicked: ProductClicked = {
  name: "Product Clicked",
  properties: mockProduct,
};

export const mockProductListViewed: ProductListViewed = {
  name: "Product List Viewed",
  properties: {
    category: "category",
    list_id: "list_id",
    products: [mockProduct],
  },
};

export const mockProductRemoved: ProductRemoved = {
  name: "Product Removed",
  properties: mockProduct,
};

export const mockProductsShared: ProductShared = {
  name: "Product Shared",
  properties: {
    ...mockProduct,
    recipient: "recipient",
    share_message: "share message",
    share_via: "Facebook",
  },
};

export const mockProductsSearched: ProductsSearched = {
  name: "Products Searched",
  properties: {
    query: "Query string",
  },
};

export const mockProductViewed: ProductViewed = {
  name: "Product Viewed",
  properties: mockProduct,
};

export const mockPromotionClicked: PromotionClicked = {
  name: "Promotion Clicked",
  properties: {
    promotion_creative: "creative",
    promotion_id: "promotionID",
    promotion_name: "name",
    promotion_position: "position",
  },
};

export const mockPromotionViewed: PromotionViewed = {
  name: "Promotion Viewed",
  properties: mockPromotionClicked.properties,
};
