/**
 * Track Event
 *
 * Extend this for any source or destination events.
 *
 * _Note this is named as TEvent to avoid clashing with the DOM type `TrackEvent`._
 */
export type TEvent<EventName = string, Properties = any> = {
  name: EventName;
  properties: Properties;
  options?: { originalTimestamp: Date };
};
