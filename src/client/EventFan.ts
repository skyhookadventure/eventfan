import pWaitFor from "p-wait-for";
import Destination from "../destinations/Destination";
import { TEvent } from "../types/TrackEvent";
import { IdentifyProps } from "../types/IdentifyProps";
import { PageViewProps } from "../types/PageViewProps";

interface EventFanProps {
  destinations: Destination[];
}

/**
 * Event Fan
 *
 * Send your analytics/tracking events to multiple destinations
 */
export default class EventFan {
  private user?: IdentifyProps;

  private destinations: Destination[] = [];

  constructor({ destinations }: EventFanProps) {
    this.destinations = destinations;
  }

  /**
   * Identify a user
   */
  identify(user: IdentifyProps): void {
    // Store the user details for future `track()` calls
    this.user = user;

    this.destinations.forEach(async (destination: Destination) => {
      // If the destination doesn't have an identify method, return
      if (!destination.identify) return;

      // Wait until the destination plugin is initialised
      await pWaitFor(() => destination.isLoaded, {
        interval: 100,
        timeout: 5000,
      });

      // Identify the user with the destination
      destination.identify(user);
    });
  }

  /**
   * Track a page view
   */
  page(props: PageViewProps): void {
    this.destinations.forEach(async (destination: Destination) => {
      // If the destination doesn't have an page method, return
      if (!destination.page) return;

      // Wait until the destination plugin is initialised
      await pWaitFor(() => destination.isLoaded, {
        interval: 100,
        timeout: 5000,
      });

      // Identify the user with the destination
      destination.page(props);
    });
  }

  /**
   * Track an event
   *
   * Tracks an event with all enabled destinations.
   *
   * @returns Promise that resolves once all tracking operations have completed with the underlying destination scripts.
   */
  async track<EventType extends TEvent>(
    trackEvent: EventType
  ): Promise<void[]> {
    const destinationTrackCallsCompleted = this.destinations.map(
      async (destination: Destination) => {
        // Wait until the destination plugin is initialised
        await pWaitFor(() => destination.isLoaded, {
          interval: 100,
          timeout: 5000,
        });

        // Apply the event mapping if it exists
        const mappedEvent =
          destination.eventMappings[trackEvent.eventName](
            trackEvent,
            this.user
          ) || trackEvent;

        // Send
        await destination.track(mappedEvent);
      }
    );

    return Promise.all(destinationTrackCallsCompleted);
  }
}
