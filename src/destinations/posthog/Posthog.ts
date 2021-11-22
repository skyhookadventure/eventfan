/* eslint-disable class-methods-use-this */
import posthog from "posthog-js";
import { TEvent } from "../../types/TrackEvent";
import { User } from "../../types/User";
import type Destination from "../Destination";
import { DestinationName } from "../DestinationName";

/**
 * Hotjar Config
 */
export interface PosthogConfig {
  teamApiKey: string;
}

/**
 * Posthog Destination
 */
export default class Posthog implements Destination {
  // Expose for use outside of EventFan (e.g. for feature flags)
  public posthog = posthog;

  constructor(protected config: PosthogConfig) {
    // Initialise in the constructor so that it can be used instantly with feature flags
    // However disable auto capture for now until initialisation
    posthog.init(this.config.teamApiKey, {
      autocapture: false, // Start with this disabled
      api_host: "https://app.posthog.com",
      capture_pageview: false, // We do this with `.page()`
    });

    // Set to the window (so it can be used globally as well e.g. for feature flags, and tested more easily)
    (window as any).posthog = posthog;
  }

  async identify(user: User): Promise<void> {
    posthog.identify(user.userId, user.traits);
  }

  async initialise(): Promise<void> {
    // Enable auto capture now it is initialised
    posthog.init(this.config.teamApiKey, {
      autocapture: true,
      api_host: "https://app.posthog.com",
      capture_pageview: false, // We do this with `.page()`
    });

    // Set the destination as loaded
    this.isLoaded = true;
  }

  /**
   * Page
   * https://posthog.com/docs/integrate/client/js#one-page-apps-and-page-views
   */
  async page() {
    posthog.capture("$pageview");
  }

  async track(event: TEvent) {
    posthog.capture(event.name, event.properties);
  }

  name = DestinationName.POSTHOG;

  isLoaded = false;
}
