import { CheckoutStarted } from "../sourceTypes/standard/ecommerce/checkout-started";

export default class EventFan {
  constructor() {
    //
  }

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

  track<SourceEventType extends SourceEvent>(
    eventName: SourceEventType["eventName"],
    props: SourceEventType["props"]
  ) {
    // Wait for identify if available
    // Get all integrations
    // const integrations = [];
    // for (const integration of integrations) {
    //   // For each get the mapping
    //   const adj = mapping[eventName].destinationFromLoop(
    //     eventName,
    //     props,
    //     identity
    //   );
    //   // Send
    //   integration.track(eventName, props || adj);
    // }
  }
}

export interface SourceEvent {
  eventName: string;
  props: any;
}
