/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Ecommerce } from "../../../../index";
import { TEvent } from "../../../../types/TrackEvent";
import { AddPaymentInfo } from "../../types/AddPaymentInfo";

export default function paymentInfoEntered({
  properties,
}: Ecommerce.PaymentInfoEntered): TEvent<"AddPaymentInfo", AddPaymentInfo> {
  return {
    name: "AddPaymentInfo",
    properties: {
      content_ids: properties.products?.map((product) => product.product_id),
      contents: properties.products?.map((product) => ({
        id: product.product_id,
        quantity: product.quantity || 1, // Default quantity to 1
      })),
      currency: properties.currency,
      value: properties.revenue,
      eventID: properties.order_id,
    },
  };
}
