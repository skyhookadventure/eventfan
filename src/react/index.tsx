// eslint-disable-next-line @typescript-eslint/no-unused-vars
import react, {
  createContext,
  ReactNode,
  useMemo,
  useContext,
  useEffect,
} from "react";
import EventFan, { EventFanConfig } from "../client/EventFan";
import { TEvent } from "../types/TrackEvent";

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
  return useContext(EventFanContext)!;
}

/**
 * EventFan Track Hook
 *
 * Useful when you already have the event properties (i.e. they are passed down from a parent component) and you want to
 * send a single track call.
 *
 * @example
 * // Track checkout started
 * useTrack({
 *   name: "Checkout Started",
 *   properties: {
 *     value: 100.00
 *   }
 * })
 */
export function useTrack(event: TEvent) {
  const eventFan = useContext(EventFanContext);

  useEffect(() => {
    if (eventFan) {
      eventFan.track(event.name, event.properties, event.options);
    }
    // Note event name/properties/options must not change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventFan]);
}
