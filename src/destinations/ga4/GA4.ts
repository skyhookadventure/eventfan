import { DestinationName } from "../DestinationName";
import { Gtag } from "./types/GtagWindow";
import { loadScript } from "../../index";
import { Page } from "../../types/PageViewProps";
import { TEvent } from "../../types/TrackEvent";
import { User } from "../../types/User";
import checkoutStarted from "./mapping/ecommerce/checkoutStarted";
import type Destination from "../Destination";
import orderCompleted from "./mapping/ecommerce/orderCompleted";
import paymentInfoEntered from "./mapping/ecommerce/paymentInfoEntered";
import productAdded from "./mapping/ecommerce/productAdded";
import productAddedToWishlist from "./mapping/ecommerce/productAddedToWishlist";
import productListViewed from "./mapping/ecommerce/productListViewed";
import productsSearched from "./mapping/ecommerce/productsSearched";
import productViewed from "./mapping/ecommerce/productViewed";

/**
 * Export mapping functions so they can be customised
 */
export {
  checkoutStarted,
  orderCompleted,
  paymentInfoEntered,
  productAdded,
  productAddedToWishlist,
  productListViewed,
  productsSearched,
  productViewed,
};

/**
 * Gtag Config
 */
export interface GA4Config {
  blockPageViewEvent?: boolean;
  measurementId: string;
  sendUserId?: boolean;
}

/**
 * Gtag Destination
 */
export default class GA4 implements Destination {
  public gtag: Gtag = window.gtag as Gtag;

  constructor(protected config: GA4Config) {}

  eventMappings = {
    "Checkout Started": checkoutStarted,
    "Order Completed": orderCompleted,
    "Payment Info Entered": paymentInfoEntered,
    "Product Added": productAdded,
    "Product Added To Wishlist": productAddedToWishlist,
    "Product List Viewed": productListViewed,
    "Product Viewed": productViewed,
    "Products Searched": productsSearched,
  };

  /**
   * Identify
   *
   * These must also be set in e.g. Google Analytics if they are to be used
   * https://developers.google.com/analytics/devguides/collection/ga4/user-properties
   */
  async identify(user: User): Promise<void> {
    if (this.config.sendUserId === false) return;

    // Set the user ID
    this.gtag("config", this.config.measurementId, {
      user_id: user.userId,
    });

    // Set the traits
    this.gtag("set", "user_properties", user.traits);
  }

  async initialise(): Promise<void> {
    // Run initial Gtag setup
    // https://developers.google.com/analytics/devguides/collection/ga4
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", this.config.measurementId, {
      // Default send page view to false (so it can be done with `.page()`)
      send_page_view: false,
    });

    // Load the script
    await loadScript(
      "event-fan-ga4",
      `https://www.googletagmanager.com/gtag/js?id=${this.config.measurementId}`
    );

    this.gtag = window.gtag;

    // Set the destination as loaded
    this.isLoaded = true;
  }

  /**
   * Page view
   * https://developers.google.com/analytics/devguides/collection/ga4/page-view
   */
  async page(page: Page): Promise<void> {
    if (this.config.blockPageViewEvent === false) return;

    this.gtag("event", "page_view", {
      page_title: page.properties?.title,
      page_location: page.properties?.url,
    });
  }

  /**
   * Track
   * https://developers.google.com/analytics/devguides/collection/ga4/events
   */
  async track(event: TEvent): Promise<void> {
    this.gtag("event", event.name, event.properties);
  }

  name = DestinationName.GA4;

  isLoaded = false;
}
