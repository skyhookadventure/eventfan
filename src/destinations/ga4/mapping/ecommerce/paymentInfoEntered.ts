/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Ecommerce } from "../../../../index";
import { TEvent } from "../../../../types/TrackEvent";
import { AddPaymentInfo, Item } from "../../types/events";
import { formatProduct } from "./checkoutStarted";

export default function paymentInfoEntered({
  properties,
}: Ecommerce.PaymentInfoEntered): TEvent<"add_payment_info", AddPaymentInfo> {
  return {
    name: "add_payment_info",
    properties: {
      payment_type: properties.payment_method,
      currency: properties.currency!,
      value: properties.revenue!,
      items: properties.products?.map(formatProduct) as Item[],
    },
  };
}
