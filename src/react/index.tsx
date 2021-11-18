// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { createContext, ReactNode, useMemo, useContext } from "react";
import EventFan, { EventFanConfig } from "../client/EventFan";

export const EventFanContext = createContext<EventFan | undefined>(undefined);

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
  config?: EventFanConfig;
}) {
  const eventFan = useMemo<EventFan>(
    () => new EventFan(props.config),
    [props.config]
  );

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
    page: client.page.bind(client),
    track: client.track.bind(client),
  };
}
