import React, { createContext, ReactNode, useEffect, useContext } from "react";
import EventFan, { EventFanConfig } from "../client/EventFan";

// Initialise EventFan immediately
// Note that React doesn't always guarantee a central App file is loaded first (e.g. Next js doesn't do this) so we need
// to load eventFan first and then update it with the destinations once they are provided. This is fine as EventFan will
// replay history to the destinations as soon as they are added.
const eventFan = new EventFan();

export const EventFanContext = createContext<EventFan>(eventFan);

export interface RudderStackConfig {
  writeKey: string;
  url?: string;
}

/**
 * EventFan Provider
 *
 * Wrap your app with this component to setup EventFan.
 *
 * @example
 * // App.ts
 * export default function App() {
 *   return (
 *     <EventFanProvider config={}>
 *       <h1>Your app</h1>
 *     </EventFanProvider>
 * }
 */
export function EventFanProvider(props: {
  children: ReactNode;
  destinations?: EventFanConfig["destinations"];
  rudderStack?: RudderStackConfig;
}) {
  // Load RudderStack config if set
  useEffect(() => {
    if (props.rudderStack?.url) {
      eventFan.load(props.rudderStack.url, props.rudderStack.writeKey);
    }
  }, [props.rudderStack]);

  // Load destinations where set
  useEffect(() => {
    props.destinations?.forEach((destination) => {
      // Note that EventFan enforces idempotency (not adding a destination twice) so we don't need to here
      eventFan.addDestination(destination);
    });
  }, [props.destinations]);

  return (
    <EventFanContext.Provider value={eventFan}>
      {props.children}
    </EventFanContext.Provider>
  );
}

/**
 * Use EventFan Hook
 *
 * Use this to access the EventFan methods (e.g. `.track()` directly).
 *
 * @example
 * const { track } = useEventFan();
 * useEffect(() => {
 *   track("Checkout Started", {
 *     value: 100.00
 *   })
 * }, [])
 */
export function useEventFan() {
  // Assume EventFan is already setup (with `EventFanContext.Provider`)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const client = useContext(EventFanContext)!;

  // Bind the methods so they are lexically scoped to the class
  return {
    addDestination: client.addDestination.bind(client),
    identify: client.identify.bind(client),
    load: client.load.bind(client),
    page: client.page.bind(client),
    track: client.track.bind(client),
  };
}
