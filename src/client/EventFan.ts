import { DestinationName } from "../destinations/DestinationName";
import { TrackEvent } from "../trackEvents/TrackEvent";
import Destination from "../destinations/Destination";

export default class EventFan {
  constructor() {
    //
  }

  private integrations: Destination[] = [];

  private mappings: {
    [eventName: string]: {
      [destinationName: string]: (e: TrackEvent) => TrackEvent;
    };
  } = {};

  addEvent(name: string, fn: any) {
    this.track[name] = fn;
  }

  addDestination() {
    //
  }

  identify() {
    //
  }

  page() {
    //
  }

  addMapping(
    eventName: string,
    destinationName: DestinationName,
    mappingFunction: (e: TrackEvent) => TrackEvent
  ): void {
    this.mappings[eventName][destinationName] = mappingFunction;
  }

  track<EventType extends TrackEvent>(
    eventName: EventType["eventName"],
    props: EventType["props"]
  ): void {
    this.integrations.forEach(async (integration) => {
      // Wait for it to be loaded
      await integration.loaded();

      // Get the mapping
      //   const adj = mapping[eventName].destinationFromLoop(
      //     eventName,
      //     props,
      //     identity
      //   );

      // Send
      await integration.track(eventName, props);
    });
  }
}
