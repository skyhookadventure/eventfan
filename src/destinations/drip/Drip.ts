/* eslint-disable no-underscore-dangle */
import { DestinationName } from "../DestinationName";
import { DripIdentity } from "./types/DripJsAPI";
import { TEvent } from "../../types/TrackEvent";
import { User } from "../../types/User";
import checkoutStarted from "./mapping/ecommerce/checkoutStarted";
import type Destination from "../Destination";
import loadScript from "../../utils/loadScript";
import orderCompleted from "./mapping/ecommerce/orderCompleted";
import productViewed from "./mapping/ecommerce/productViewed";

/**
 * Export mapping functions so they can be customised
 */
export { productViewed, orderCompleted, checkoutStarted };

/**
 * Drip Config
 */
export interface DripConfig {
  accountId: string;
  enableUserCreation?: boolean;
}

/**
 * Drip Destination
 */
export default class Drip implements Destination {
  private drip = window._dcq;

  constructor(protected config: DripConfig) {
    // Run initial Setup
    window._dcq = window._dcq || [];
    window._dcs = window._dcs || {};
    window._dcs.account = this.config.accountId;
  }

  eventMappings = {
    "Order Completed": orderCompleted,
    "Product Viewed": productViewed,
    "Checkout Started": checkoutStarted,
  };

  /**
   * Identify
   */
  async identify(user: User): Promise<void> {
    // Drip requires an email
    const { traits } = user;
    if (!traits.email) return;

    // Stop if enableUserCreation is false, as identify always creates the user as a subscriber
    if (this.config.enableUserCreation === false) return;

    // Map to the drip user format
    const dripUser: DripIdentity = {
      email: traits.email,
      first_name: traits.firstName,
      last_name: traits.lastName,
      phone: traits.phone,
      user_id: traits.id,
    };

    this.drip.push(["identify", dripUser]);
  }

  /**
   * Initialise
   *
   * https://developer.drip.com/#installing-your-javascript-snippet
   */
  async initialise(): Promise<void> {
    // Load the script
    await loadScript(
      "event-fan-drip",
      `//tag.getdrip.com/${this.config.accountId}.js`
    );

    this.drip = window._dcq;

    // Set the destination as loaded
    this.isLoaded = true;
  }

  async track(track: TEvent): Promise<void> {
    this.drip.push([
      "track",
      track.name,
      {
        ...track.properties,
        occurred_at: track.options?.originalTimestamp,
      },
    ]);
  }

  name = DestinationName.DRIP;

  isLoaded = false;
}
