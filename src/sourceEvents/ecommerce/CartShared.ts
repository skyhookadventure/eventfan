import { TEvent } from "../../../types/TrackEvent";
import { Product } from "./shared/Product";

interface CartSharedProps {
  /**
   * Cart ID associated with the product displayed
   */
  cart_id?: string;
  /**
   * Products displayed in the product list
   */
  products: Product[];
  /**
   * Recipient of the sharing
   */
  recipient?: string;
  /**
   * Message that the sender sent
   */
  share_message?: string;
  /**
   * Method of sharing
   */
  share_via: string;
}

/**
 * Shared the cart with one or more friends
 */
export type CartShared = TEvent<"Cart Shared", CartSharedProps>;
