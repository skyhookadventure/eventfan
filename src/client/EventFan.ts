import Destination from "../destinations/Destination";
import { TEvent } from "../types/TrackEvent";
import { IdentifyProps } from "../types/IdentifyProps";
import { PageViewProps } from "../types/PageViewProps";

/**
 * Constructor props
 */
interface ConstructorProps {
  /**
   * Destinations that you want to send events to.
   */
  destinations: Destination[];
}

/**
 * Event Fan
 *
 * Send your analytics/tracking events to multiple destinations.
 *
 * @example
 * // Initialise
 * const client = new EventFan({
 *   destinations: [
 *     new FacebookPixel("YOUR_PIXEL_ID")
 *   ]
 * })
 */
export default class EventFan {
  /**
   * Call destinations once they have loaded
   *
   * Helper function to e.g. only call destination track methods once the destinations have loaded.
   */
  private async callDestinationsOnceLoaded(
    callback: (destination: Destination) => Promise<void> | void
  ) {
    // Create an array of promises for each destination callback
    const promises = this.destinations.map(async (destination: Destination) => {
      // Wait until the destination plugin is initialised
      const isReadyBeforeTimeout = new Promise<boolean>((resolve) => {
        // Polling settings
        const pollInterval = 250;
        const timeout = 5000;
        let retriesRemaining = timeout / pollInterval;

        // Poll recursively until the destination is loaded (or we hit a timeout)
        function poll() {
          // If we reach the retries limit, stop
          if (retriesRemaining === 0) {
            resolve(false);
          }

          // Resolve if the destination is ready
          if (destination.isLoaded) {
            resolve(true);
          }

          // Otherwise decrease the retries remaining and retry
          else {
            retriesRemaining -= 1;
            setTimeout(poll, pollInterval);
          }
        }
        poll();
      });

      // Callback if the destination is ready (before the timeout)
      if (await isReadyBeforeTimeout) {
        await callback(destination);
      }
    });

    // Return when all destination callbacks have returned
    await Promise.all(promises);
  }

  /**
   * Stores the user details when {@link identify} has been called
   *
   * This allows destination `track` methods to use user details within their payloads, even if identify was called some
   * time ago.
   */
  private user?: IdentifyProps;

  /**
   * Stores any destinations (e.g. Facebook Pixel) that have been added.
   */
  private destinations: Destination[] = [];

  /**
   * Constructor
   */
  constructor({ destinations }: ConstructorProps) {
    this.destinations = destinations;
  }

  /**
   * Identify a user
   *
   * The identify call lets you identify a visiting user and associate them to their actions. It also lets you record
   * the traits about them like their name, email address, etc.
   */
  async identify(user: IdentifyProps): Promise<void> {
    // Store the user details for future `track()` calls
    this.user = user;

    await this.callDestinationsOnceLoaded((destination: Destination) =>
      destination.identify?.(user)
    );
  }

  /**
   * Track a page view
   */
  async page(props: PageViewProps): Promise<void> {
    await this.callDestinationsOnceLoaded((destination: Destination) =>
      destination.page?.(props)
    );
  }

  /**
   * Track an event
   *
   * Tracks an event with all enabled destinations.
   *
   * @returns Promise that resolves once all tracking operations have completed with the underlying destination scripts.
   */
  async track<EventType extends TEvent>(trackEvent: EventType): Promise<void> {
    await this.callDestinationsOnceLoaded((destination: Destination) => {
      // Apply the event mapping if it exists
      const mappedEvent =
        destination.eventMappings[trackEvent.eventName](
          trackEvent,
          this.user
        ) || trackEvent;

      // Send
      return destination.track(mappedEvent);
    });
  }
}
