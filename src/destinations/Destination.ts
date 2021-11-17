/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-useless-constructor */
import { DestinationName } from "./DestinationName";
import { User } from "../types/User";
import { Page } from "../types/PageViewProps";
import { TEvent } from "../types/TrackEvent";

/**
 * Destination Abstract Class (implement this)
 *
 * Implement this @abstract class whenever you want to create a new destination.
 *
 * @example
 * class FacebookPixel implements Destination {
 *   name: DestinationName.FACEBOOK_PIXEL;
 *   // ...
 * }
 */
export default abstract class Destination {
  /**
   * Event mappings
   *
   * Allows mapping from source events (e.g. the standard ecommerce Checkout Completed event) to destination events
   * (e.g. the Facebook Pixel Purchase event).
   *
   * Sensible defaults should be provided where mappings are needed (i.e. where the destination can't accept events in
   * any format), for all events that the destination supports.
   *
   * It is recommended that these are defined outside of the class file, in a `/eventMappings` directory and then
   * imported into your class.
   *
   * Mappings can be overwritten by the user, to customise them.
   */
  public eventMappings?: {
    [name: string]: (trackEvent: TEvent<any, any>, user?: User) => TEvent;
  } = {};

  /**
   * Identify
   *
   * For destinations that have an `identify()` method this should be called here.
   */
  abstract identify?: (user: User) => void;

  /**
   * Initialise
   *
   * Load the provider script if a browser-based plugin, or e.g. initialise an node module.
   */
  abstract initialise: () => void | Promise<void>;

  /**
   * Is Loaded
   *
   * Set to true as soon as the plugin is ready to accept identify/track/page calls.
   */
  public isLoaded = false;

  /**
   * Destination name
   *
   * For new destinations, edit the underlying enum to add the name in.
   */
  abstract name: DestinationName;

  /**
   * Call a page-view track method (if defined)
   */
  abstract page?: (props: Page) => void;

  /**
   * Track
   *
   * Call the destination `track()` method, or specific track methods for specific event names.
   *
   * Note __no transformations of the event payload should be done here__ (e.g. changing property names) as that should be
   * done with the event mappings.
   *
   * @returns Promise that resolves once the underlying tracking call has been completed (allows the user to await a
   * `track()` call and then do something once all underlying destinations have completed).
   */
  abstract track?: <EventType extends TEvent>(
    event: EventType
  ) => Promise<void>;

  /**
   * If you need any environmental variables, set them with the constructor.
   */
  constructor() {}
}
