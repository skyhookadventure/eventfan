/* eslint-disable import/prefer-default-export */
import { OrderCompleted } from "../sourceEvents/ecommerce";

export const mockOrderCompleted: OrderCompleted = {
  name: "Order Completed",
  properties: {
    currency: "GBP",
    order_id: "orderID",
    products: [
      {
        product_id: "productID",
        quantity: 2,
      },
    ],
    revenue: 100.0,
    total: 200.0,
  },
};
