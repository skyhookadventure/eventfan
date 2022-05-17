import type { User as SentryUser, Breadcrumb } from "@sentry/browser";
import { Severity } from "@sentry/browser";
import { TEvent } from "../../types/TrackEvent";
import { User } from "../../types/User";
import type Destination from "../Destination";
import { DestinationName } from "../DestinationName";

/**
 * Sentry Config
 */
export interface SentryConfig {
  /**
   * setUser function from Sentry
   */
  setUser: (user: SentryUser | null) => void;
  addBreadcrumb(breadcrumb: Breadcrumb): void;
}

/**
 * Sentry Destination
 *
 * Note we assume you have already configured sentry (e.g. with `Sentry.init()`), so you can simply pass the initialised client
 * here). This is so you can also use sentry outside of EventFan.
 *
 * @example
 * import { init, setUser, addBreadcrumb } from "@sentry/browser";
 * import { Sentry } from "eventfan";
 * init({...config});
 * const sentryDestination = new Sentry({ setUser, addBreadcrumb });
 *
 */
export default class Sentry implements Destination {
  private sentry: SentryConfig;

  constructor(protected config: SentryConfig) {
    this.sentry = config;
  }

  /**
   * Identify
   */
  async identify(user: User): Promise<void> {
    this.sentry.setUser(user.traits);
  }

  /**
   * Track
   */
  async track(event: TEvent): Promise<void> {
    this.sentry.addBreadcrumb({
      category: event.name,
      data: event.properties,
      level: Severity.Info,
    });
  }

  async initialise(): Promise<void> {
    // Set the destination as loaded
    this.isLoaded = true;
  }

  name = DestinationName.SENTRY;

  isLoaded = false;
}
