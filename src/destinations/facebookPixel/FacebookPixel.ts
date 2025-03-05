 
 
import { AdvancedMatching } from "./types/AdvancedMatching";
import { ContentType } from "./types/shared/GenericFacebookEvent";
import { DestinationName } from "../DestinationName";
import { FBQ } from "./types/FBQ";
import { Gender, User } from "../../types/User";
import { loadScript } from "../..";
import { TEvent } from "../../types/TrackEvent";
import checkoutStarted from "./mapping/ecommerce/checkoutStarted";
import type Destination from "../Destination";
import orderCompleted from "./mapping/ecommerce/orderCompleted";
import paymentInfoEntered from "./mapping/ecommerce/paymentInfoEntered";
import productAdded from "./mapping/ecommerce/productAdded";
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
  productListViewed,
  productsSearched,
  productViewed,
};

/**
 * Facebook Pixel Config
 */
export interface FacebookPixelConfig {
  advancedMapping?: boolean;
  categoryToContent?: Array<{ from: string; to: ContentType }>;
  pixelId: string;
}

/**
 * Facebook Pixel Destination
 *
 * For use with __browser-side events only__.
 *
 * https://developers.facebook.com/docs/facebook-pixel/reference
 */
export default class FacebookPixel implements Destination {
  private fb: FBQ = window.fbq as FBQ;

  constructor(protected config: FacebookPixelConfig) {}

  // Note we bind `this` to all methods that require access to `this.config`
  eventMappings = {
    "Order Completed": orderCompleted.bind(this),
    "Payment Info Entered": paymentInfoEntered,
    "Product Added": productAdded.bind(this),
    "Product Viewed": productViewed.bind(this),
    "Checkout Started": checkoutStarted.bind(this),
    "Product List Viewed": productListViewed.bind(this),
    "Products Searched": productsSearched,
  };

  /**
   * Identify
   *
   * Note that Facebook hashes these values, so there are some special requirements (e.g. most
   * strings must be in lower case).
   * https://developers.facebook.com/docs/facebook-pixel/advanced/advanced-matching/
   */
  async identify(user: User): Promise<void> {
    // Don't run if advancedMapping is disabled
    if (this.config.advancedMapping === false) return;

    const { traits } = user;

    // Set Facebook gender format
    let gender: AdvancedMatching["ge"];
    if (traits.gender === Gender.MALE) gender = "m";
    if (traits.gender === Gender.FEMALE) gender = "f";

    const advancedMatchingParameters: AdvancedMatching = {
      country: traits.address?.country?.toLowerCase(),
      ct: traits.address?.city?.toLowerCase()?.replace(/\s/g, ""),
      db: traits.birthday
        ? parseInt(traits.birthday.replace(/-/g, ""))
        : undefined,
      em: traits.email?.toLowerCase(),
      external_id: traits.id,
      fn: traits.firstName?.toLowerCase(),
      ge: gender,
      ln: traits.lastName?.toLowerCase(),
      ph: traits.phone ? parseInt(traits.phone) : undefined,
      st: traits.address?.state?.toLowerCase(),
      zp: traits.address?.postalCode,
    };

    // Re-initialise with advanced matching parameters
    this.fb("init", this.config.pixelId, advancedMatchingParameters);
  }

  async initialise(): Promise<void> {
    // Run initial FB Pixel Setup (this is taken from the code setup tool on the FB Events Manager)
    (window as any).fbq = function pixelHandler(...setupArgs: any[]) {
      if (this.fb.callMethod) {
        this.fb.callMethod.call(this.fb, ...setupArgs);
      } else {
        this.fb.queue.push(setupArgs);
      }
    };
    this.fb = window.fbq!;
     
    window._fbq = this.fb;
    this.fb.push = this.fb;
    this.fb.loaded = !0;
    this.fb.queue = [];

    await loadScript(
      "event-fan-facebook-pixel",
      "https://connect.facebook.net/en_US/fbevents.js"
    );

    // To enable manual (rather than automatic) page views, both these settings need to be enabled
    this.fb.disablePushState = true;
    this.fb.allowDuplicatePageViews = true;

    // Initialise with the pixel ID
    this.fb("init", this.config.pixelId);

    // Set the destination as loaded
    this.isLoaded = true;
  }

  async page(): Promise<void> {
    this.fb("track", "PageView");
  }

  async track(event: TEvent): Promise<void> {
    // Standard events use `track` and custom use `trackCustom`
    // https://developers.facebook.com/docs/facebook-pixel/reference#standard-events
    const standardTrackNames = [
      "AddPaymentInfo",
      "AddToCart",
      "AddToWishlist",
      "CompleteRegistration",
      "Contact",
      "CustomizeProduct",
      "Donate",
      "FindLocation",
      "InitiateCheckout",
      "Lead",
      "Purchase",
      "Schedule",
      "Search",
      "StartTrial",
      "SubmitApplication",
      "Subscribe",
      "ViewContent",
    ];

    if (standardTrackNames.includes(event.name)) {
      this.fb("track", event.name, event.properties);
    } else {
      this.fb("trackCustom", event.name, event.properties);
    }
  }

  name = DestinationName.FACEBOOK_PIXEL;

  isLoaded = false;
}
