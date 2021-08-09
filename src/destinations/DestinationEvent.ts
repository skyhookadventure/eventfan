/**
 * Destination Event type
 *
 * Most destinations will use this as they require both an event name and it's' properties.
 */
export type DestinationEvent<T> = {
  name: string;
  properties: T;
};
