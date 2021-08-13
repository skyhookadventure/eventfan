# Event Fan

[![Built with
typescript](https://badgen.net/badge/icon/typescript?icon=typescript&label)](https://www.typescriptlang.org/)

Send tracking/analytics events to multiple destinations (Google Analytics, Facebook, Rudderstack...), with TypeScript.

## Quick Start

Initialise your client:

```typescript
import EventFan, { FacebookPixel } from "event-fan";

const eventFan = new EventFan({
  destinations: [
    // Any destinations you want here
    new FacebookPixel("your-facebook-key"),
  ],
});
```

Identify a user when they log in:

```typescript
eventFan.identify({
  first_name: "First name",
});
```

Track events, using either the Segment/Rudderstack Specification types (included), or with your own types (created with
`TEvent<name, properties>`). With standard events the properties are automatically converted to the correct format for
each destination (in this case Facebook Pixel's `Purchase` event for example):

```typescript
import { Ecommerce } from "event-fan";

eventFan.track<Ecommerce.OrderCompleted>({
  eventName: "Order Completed",
  props: {
    order_id: "order_UUID",
    // ...
  },
});
```

## Key features

### 1. Emit Type-Safe Events

Use the included event types (e.g. "Order Completed") from the
RudderStack/Segment specifications, or create your own custom typings:

```typescript
type CustomEvent = TEvent<"Custom Event Name", {
  iceCream: string;
}>

eventFan.track<CustomEvent>({
  eventName: "Custom Event Name", {
    iceCream: "vanilla"
  }
})

```

### 2. Map events to destination events (Facebook Ads, Google Analytics..), with sensible defaults

Either use the default mappings (similar to RudderStack/Segment), or write your own:

```typescript
export function customOrderCompleted({
  props,
}: Ecommerce.OrderCompleted): TEvent<"Purchase", Purchase> {
  // E.g. start with the default mapping
  const defaults = FacebookPixel.orderCompleted({ props });

  // And change the Facebook pixel content type to always be a travel destination
  return {
    ...defaults,
    content_type: FacebookPixel.ContentType.DESTINATION,
  };
}
facebookPixel.mapping["Order Completed"] = customOrderCompleted;
```

### 3. Extend with new destinations

Have a new destination you want to add? Simply implement the `Destination` class:

```typescript
class CustomDestination implements Destination {
  initialise(): void {
    destinationNodeModule.initialise(this.eventKey);
  }

  // ...
}
```

## Contributing

### Setup

The only requirement is [playwright](https://playwright.dev/docs/intro) for cross-browser testing. Install the test
browsers separately with:

```bash
npx playwright install
```
