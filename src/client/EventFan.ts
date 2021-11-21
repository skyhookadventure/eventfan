/* eslint-disable default-param-last */
/* eslint-disable no-restricted-syntax */
import type Destination from "../destinations/Destination";
import type { TEvent } from "../types/TrackEvent";
import type { User } from "../types/User";
import type { Page } from "../types/PageViewProps";
import type { RudderStack } from "../types/RudderStack";
import { DestinationName } from "../destinations/DestinationName";

/**
 * Constructor props
 */
export interface EventFanConfig {
  /**
   * Destinations that you want to send events to.
   */
  destinations?: Destination[];
}

/**
 * Event Fan
 *
 * Send your analytics/tracking events to multiple destinations.
 */
export default class EventFan {
  /**
   * User details
   *
   * Created/updated when {@link identify} has been called
   */
  private user?: User;

  /**
   * Destinations (e.g. Facebook Pixel)
   */
  private destinations: Destination[] = [];

  /**
   * Loaded destinations only
   */
  private get loadedDestinations(): Destination[] {
    return this.destinations.filter((dest) => dest.isLoaded === true);
  }

  /**
   * Event history
   *
   * Used for replaying of events, e.g. if a destination is loaded after a `.track()` call has already been made.
   */
  private eventHistory: Array<{ track?: TEvent; page?: Page }> = [];

  /**
   * Constructor
   */
  constructor(props: EventFanConfig = {}) {
    const destinationsToAdd = props.destinations || [];

    for (const dest of destinationsToAdd) {
      this.addDestination(dest);
    }
  }

  /**
   * Add a destination
   *
   * Adds a destination, initialises it and then replays history before initialisation.
   */
  async addDestination(destination: Destination): Promise<void> {
    // Enforce idempotency (do not add a destination twice)
    const alreadyExists = this.destinations.find(
      (existingDestination) => existingDestination.name === destination.name
    );
    if (alreadyExists) return;

    this.destinations.push(destination);

    try {
      await destination.initialise();
      await this.replayHistory(destination);
    } catch (e: any) {
      // Initialisation can fail for many reasons (most likely http errors). If this happens we simply log here, and as
      // the destination `isLoaded` property will still be false it won't be called again.
      console.log(`Failed to load destination ${destination.name}`, e?.message);
    }
  }

  /**
   * Load rudderstack Config
   *
   * Asynchronously loads all destinations within the RudderStack config that are enabled
   */
  async load(
    writeKey: string,
    url = "https://api.rudderlabs.com",
    dataPlaneURL = "https://hosted.rudderlabs.com"
  ) {
    const response = await fetch(`${url}/sourceConfig/`, {
      headers: { Authorization: `Basic ${btoa(`${writeKey}:`)}` },
    });
    const settings = (await response.json()) as RudderStack;
    const { destinations } = settings.source;

    // Load the RudderStack destination
    import("../destinations/rudderStack/RudderStack").then(
      ({ default: RudderStack }) => {
        this.addDestination(new RudderStack({ writeKey, dataPlaneURL }));
      }
    );

    // Load each destination asynchronously, with dynamic imports
    // We use dynamic imports here to avoid a large initial bundle that would otherwise include all destinations
    await Promise.all(
      destinations.map(async (destinationSettings) => {
        // Don't add if the destination is disabled
        if (destinationSettings.enabled !== true) return;

        // Dynamically import by name
        switch (destinationSettings.destinationDefinition.name) {
          case DestinationName.DRIP:
            import("../destinations/drip/Drip").then(({ default: Drip }) => {
              this.addDestination(new Drip(destinationSettings.config));
            });
            break;

          case DestinationName.FACEBOOK_PIXEL:
            import("../destinations/facebookPixel/FacebookPixel").then(
              ({ default: FacebookPixel }) => {
                this.addDestination(
                  new FacebookPixel(destinationSettings.config)
                );
              }
            );
            break;

          case DestinationName.GA4:
            import("../destinations/ga4/GA4").then(({ default: GA4 }) => {
              this.addDestination(new GA4(destinationSettings.config));
            });
            break;

          case DestinationName.HOTJAR:
            import("../destinations/hotjar/Hotjar").then(
              ({ default: Hotjar }) => {
                this.addDestination(new Hotjar(destinationSettings.config));
              }
            );
            break;

          case DestinationName.POSTHOG:
            import("../destinations/posthog/Posthog").then(
              ({ default: Posthog }) => {
                this.addDestination(new Posthog(destinationSettings.config));
              }
            );
            break;

          default:
            console.log(
              `EventFan does not support ${destinationSettings.name} yet.`
            );
        }
      })
    );
  }

  /**
   * Replay history for a destination
   */
  private async replayHistory(destination: Destination): Promise<void> {
    // Identify
    if (this.user) {
      await destination.identify?.(this.user);
    }

    // Replay all page/track calls in order
    for (const historicalEvent of this.eventHistory) {
      if (historicalEvent.page) {
        await destination.page?.(historicalEvent.page);
      }

      if (historicalEvent.track) {
        // Apply the event mapping if it exists on this destination
        const mappedEvent =
          destination.eventMappings?.[historicalEvent.track.name]?.(
            historicalEvent.track,
            this.user
          ) || historicalEvent.track;

        await destination.track?.(mappedEvent);
      }
    }
  }

  /**
   * Identify a user
   *
   * The identify call lets you identify a visiting user and associate them to their actions. It also lets you record
   * the traits about them like their name, email address, etc.
   *
   */
  async identify(
    userId: User["userId"],
    traits: User["traits"] = {},
    options?: User["options"],
    /** @deprecated Use async/await instead */
    callback?: () => void
  ): Promise<void> {
    // Format as a single object (destinations use this format)
    const user: User = {
      userId,
      // Default the id as userId if set
      traits: { id: userId, ...traits },
      options,
    };

    // Store the user details
    this.user = user;

    // Call each destination's identify method
    await Promise.all(
      this.loadedDestinations.map((destination: Destination) =>
        destination.identify?.(user)
      )
    );

    // Call the callback (deprecated)
    callback?.();
  }

  /**
   * Track a page view
   *
   * __If migrating from RudderStack SDK V1__ note that category is now within the properties object.
   */
  async page(
    name: Page["name"] = document.title,
    properties: Partial<Page["properties"]> = {},
    options?: Page["options"],
    /** @deprecated Use async/await instead */
    callback?: () => void
  ): Promise<void> {
    // Format as a single object (destinations use this format)
    const page: Page = {
      name,
      properties: {
        // Set defaults from browser
        title: name,
        url: window.location.href,
        path: window.location.pathname,
        ...properties,
      },
      options,
    };

    // Add to the events history (for replays)
    this.eventHistory.push({
      page: {
        ...page,
        // Set the original timestamp if not set
        options: { originalTimestamp: new Date(), ...page.options },
      },
    });

    // Use the destinations
    await Promise.all(
      this.loadedDestinations.map((destination: Destination) =>
        destination.page?.(page)
      )
    );

    // Call the callback (deprecated)
    callback?.();
  }

  /**
   * Track an event
   *
   * Tracks an event with all enabled destinations.
   *
   * @returns Promise that resolves once all tracking operations have completed with the underlying destination scripts.
   */
  async track<EventType extends TEvent>(
    name: EventType["name"],
    properties?: EventType["properties"],
    options?: EventType["options"],
    /** @deprecated Use async/await instead */
    callback?: () => void
  ): Promise<void> {
    // Format as a single object (destinations use this format)
    const trackEvent: TEvent = { name, properties, options };

    // Add to the events history (for replays)
    this.eventHistory.push({
      track: {
        ...trackEvent,
        // Set the original timestamp if not set
        options: { originalTimestamp: new Date(), ...trackEvent.options },
      },
    });

    // Use the destinations
    await Promise.all(
      // Only loaded destinations (note when a destination is loaded it replays missed events)
      this.loadedDestinations.map((destination: Destination) => {
        // Apply the event mapping if it exists on this destination
        const mappedEvent =
          destination.eventMappings?.[trackEvent.name]?.(
            trackEvent,
            this.user
          ) || trackEvent;

        // Send
        return destination.track?.(mappedEvent);
      })
    );

    // Call the callback (deprecated)
    callback?.();
  }
}
