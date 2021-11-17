/* eslint-disable default-param-last */
/* eslint-disable no-restricted-syntax */
import Destination from "../destinations/Destination";
import { TEvent } from "../types/TrackEvent";
import { User } from "../types/User";
import { Page } from "../types/PageViewProps";

/**
 * Constructor props
 */
interface ConstructorProps {
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
  constructor(props: ConstructorProps = {}) {
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
        await destination.track(historicalEvent.track);
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
        return destination.track(mappedEvent);
      })
    );

    // Call the callback (deprecated)
    callback?.();
  }
}
