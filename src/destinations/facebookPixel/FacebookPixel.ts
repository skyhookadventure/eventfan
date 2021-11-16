/* eslint-disable @typescript-eslint/no-explicit-any */
import { Gender, User } from "../../types/User";
import { TEvent } from "../../types/TrackEvent";
import Destination from "../Destination";
import { DestinationName } from "../DestinationName";
import loadScript from "../../utils/loadScript";
import orderCompleted from "./mapping/ecommerce/orderCompleted";
import { AdvancedMatching } from "./types/AdvancedMatching";
import { FBQ } from "./types/FBQ";

/**
 * Facebook Pixel Config
 */
export interface FacebookPixelConfig {
  categoryToContent?: Array<{ from: string; to: string }>;
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
  private fb = (window as any).fbq as FBQ;

  constructor(private config: FacebookPixelConfig) {}

  eventMappings = {
    "Order Completed": orderCompleted,
  };

  /**
   * Identify
   *
   * Note that Facebook hashes these values, so there are some special requirements (e.g. most
   * strings must be in lower case).
   * https://developers.facebook.com/docs/facebook-pixel/advanced/advanced-matching/
   */
  identify(user: User): void {
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
    await loadScript(
      "facebook-pixel-integration",
      "https://connect.facebook.net/en_US/fbevents.js"
    );
    this.fb.disablePushState = true; // Disable automatic page tracking
    this.fb("init", this.config.pixelId);
    this.isLoaded = true;
  }

  page(): void {
    this.fb("track", "PageView");
  }

  track(event: TEvent): Promise<void> {
    this.fb("track", event.name, event.properties);

    // Resolve immediately as Facebook Pixel has no way of firing a callback once complete
    return Promise.resolve();
  }

  name = DestinationName.FACEBOOK_PIXEL;

  isLoaded = false;
}
