/* eslint-disable @typescript-eslint/no-explicit-any */
import { IdentifyProps } from "../../types/IdentifyProps";
import { TEvent } from "../../types/TrackEvent";
import Destination from "../Destination";
import { DestinationName } from "../DestinationName";
import loadScript from "../loadScript";
import orderCompleted from "./mapping/ecommerce/orderCompleted";
import { AdvancedMatching } from "./types/AdvancedMatching";

export default class FacebookPixel implements Destination {
  private fb = (window as any).fbq;

  constructor(private pixelID: string) {}

  eventMappings = {
    "Order Completed": orderCompleted,
  };

  identify(user: IdentifyProps): void {
    const traits: AdvancedMatching = {
      country: user.address?.country?.toLowerCase(),
      fn: user.firstName,
      ln: user.lastName,
      ct: user.address?.city,
      //   db: user.birthday,
      external_id: user.id,
      //   ge: user.gender,
      //   ph: parseInt(user.phone?),
      st: user.address?.state,
      zp: user.address?.state,
    };

    // Re-initialise with advanced matching parameters
    this.fb("init", "PageView", traits);
  }

  async initialise(): Promise<void> {
    await loadScript(
      "facebook-pixel-integration",
      "https://connect.facebook.net/en_US/fbevents.js"
    );
    this.fb("init", this.pixelID);
  }

  page(): void {
    this.fb("track", "PageView");
  }

  track(event: TEvent): Promise<void> {
    this.fb("track", event.eventName, event.props);

    // Resolve immediately as Facebook Pixel has no way of firing a callback once complete
    return Promise.resolve();
  }

  name = DestinationName.FACEBOOK_PIXEL;

  isLoaded: boolean = typeof window !== "undefined" && !!(window as any).fbq;
}
