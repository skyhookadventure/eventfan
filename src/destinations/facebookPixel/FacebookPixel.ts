/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "../../types/IdentifyProps";
import { TEvent } from "../../types/TrackEvent";
import Destination from "../Destination";
import { DestinationName } from "../DestinationName";
import loadScript from "../loadScript";
import orderCompleted from "./mapping/ecommerce/orderCompleted";
import { AdvancedMatching } from "./types/AdvancedMatching";

/**
 * Facebook Pixel Destination
 *
 * For use with __browser-side events only__.
 */
export default class FacebookPixel implements Destination {
  private fb = (window as any).fbq;

  constructor(private pixelID: string) {}

  eventMappings = {
    "Order Completed": orderCompleted,
  };

  identify(user: User): void {
    if (!user.traits) return;
    const { traits } = user;
    const advancedMatchingParameters: AdvancedMatching = {
      country: traits.address?.country?.toLowerCase(),
      fn: traits.firstName,
      ln: traits.lastName,
      ct: traits.address?.city,
      db: traits.birthday
        ? parseInt(traits.birthday.toISOString().slice(0, 10).replace(/-/g, ""))
        : undefined,
      external_id: traits.id,
      ge: traits.gender,
      ph: traits.phone ? parseInt(traits.phone) : undefined,
      st: traits.address?.state,
      zp: traits.address?.state,
    };

    // Re-initialise with advanced matching parameters
    this.fb("init", "PageView", advancedMatchingParameters);
  }

  async initialise(): Promise<void> {
    await loadScript(
      "facebook-pixel-integration",
      "https://connect.facebook.net/en_US/fbevents.js"
    );
    this.fb("init", this.pixelID);
    this.fb.disablePushState = true; // Disable automatic page tracking
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
