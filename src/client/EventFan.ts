import Destination from "../destinations/Destination";
import { TEvent } from "../types/TrackEvent";
import { IdentifyTraits, User } from "../types/IdentifyProps";
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
  private get loadedDestinations() {
    return this.destinations.filter((dest) => dest.isLoaded === true);
  }

  /**
   * Event history
   *
   * Used for replaying of events, e.g. if a destination is loaded after a `.track()` call has already been made.
   */
  private eventHistory: Array<{ track?: TEvent; page?: PageViewProps }> = [];

  /**
   * Constructor
   */
  constructor(props?: ConstructorProps) {
    this.destinations = props?.destinations || [];
    this.destinations.forEach((destination) => destination.initialise());
  }

  /**
   * Identify a user
   *
   * The identify call lets you identify a visiting user and associate them to their actions. It also lets you record
   * the traits about them like their name, email address, etc.
   */
  async identify(
    userId: User["userId"],
    traits?: User["traits"]
  ): Promise<void> {
    // Format as a single object (destinations use this format)
    const user: User = { userId, traits };

    // Store the user details
    this.user = user;

    // Call each destination's identify method
    await Promise.all(
      this.loadedDestinations.map((destination: Destination) =>
        destination.identify?.(user)
      )
    );
  }

  /**
   * Track a page view
   */
  async page(props: PageViewProps): Promise<void> {
    // Add to the events history (for replays)
    this.eventHistory.push({ page: props });

    // Use the destinations
    await Promise.all(
      this.loadedDestinations.map((destination: Destination) =>
        destination.page?.(props)
      )
    );
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
    options?: EventType["options"]
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
          destination.eventMappings[trackEvent.name]?.(trackEvent, this.user) ||
          trackEvent;

        // Send
        return destination.track(mappedEvent);
      })
    );
  }
}
