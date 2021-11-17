import { Gtag } from "gtag.js";
import { loadScript } from "../../index";
import { Page } from "../../types/PageViewProps";
import { TEvent } from "../../types/TrackEvent";
import { User } from "../../types/User";
import Destination from "../Destination";
import { DestinationName } from "../DestinationName";

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
  private gtag: Gtag = window.gtag as Gtag;

  constructor(protected config: GA4Config) {}

  /**
   * Identify
   *
   * These must also be set in e.g. Google Analytics if they are to be used
   * https://developers.google.com/analytics/devguides/collection/ga4/user-properties
   */
  identify(user: User): void {
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
    if (!this.gtag) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = (...args: any[]) => {
        window.dataLayer.push(args);
      };
      gtag("js", new Date());
      this.gtag = window.gtag;
    }

    // Load the script
    await loadScript(
      "event-fan-ga4",
      `https://www.googletagmanager.com/gtag/js?id=${this.config.measurementId}`
    );

    // Set the measurement ID & config
    this.gtag("config", this.config.measurementId, {
      // Default send page view to false (so it can be done with `.page()`)
      send_page_view: false,
    });

    // Set the destination as loaded
    this.isLoaded = true;
  }

  /**
   * Page view
   * https://developers.google.com/analytics/devguides/collection/ga4/page-view
   */
  async page(page: Page) {
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
  async track(event: TEvent) {
    this.gtag("event", event.name, event.properties);
  }

  name = DestinationName.GA4;

  isLoaded = false;
}
