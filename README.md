# Event Fan

[![Built with
typescript](https://badgen.net/badge/icon/typescript?icon=typescript&label)](https://www.typescriptlang.org/)

Send tracking events (e.g. order completed) to multiple destinations (Google Analytics, Facebook...), with the correct
formatting applied automatically.

Loads fast on the browser - the core lib is c. 4kb (minified) and destinations (e.g. Facebook Pixel) can be loaded
asynchronously. Setup for zero-config tree shaking by default (removes unused code/destinations), with your existing bundler (e.g. Webpack/Esbuild).

Built for reliability with unit test coverage, e2e tests on popular browsers and type safety.

## Quick Start

### Initialise Client & Destinations

Initialise just once in your application:

```typescript
import EventFan, { FacebookPixel } from "event-fan";

const eventFan = new EventFan({
  destinations: [
    // Any destinations you want here
    new FacebookPixel({ pixelId: "your-facebook-pixel-id" }),
  ],
});
```

### Track page loads

By default it will use the page `<Title/>` and url:

```typescript
eventFan.page();
```

### Identify users

Identify a user when they log in:

```typescript
eventFan.identify("userID", {
  first_name: "Jane",
  last_name: "Doe",
  email: "jane@example.com",
  // ...
});
```

### Track events

Track events, using 50+ Segment/Rudderstack Specification types (included), or with your own types (created with
`TEvent<name, properties>`). With standard events the properties are automatically converted to the correct format for
each destination (in this case Facebook Pixel's `Purchase` event for example):

```typescript
import { Ecommerce } from "event-fan";

eventFan.track<Ecommerce.OrderCompleted>("Order Completed", {
  order_id: "order_UUID",
  // ...
});
```

For pure JavaScript users, just omit the typing:

```javascript
eventFan.track("Order Completed", {
  order_id: "order_UUID",
  // ...
});
```

## Customise

### Create your own event types

To add custom events, extend the `TEvent` type:

```typescript
type CustomEvent = TEvent<
  "Custom Event Name",
  {
    iceCream: string;
  }
>;

eventFan.track<CustomEvent>("Custom Event Name", {
  iceCream: "vanilla",
});
```

### Customise how events are mapped (converted) for destinations (Facebook Ads, Google Analytics..)

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

// Add to your client
const facebookPixel = new FacebookPixel({ pixelId: "123" });
facebookPixel.mapping["Order Completed"] = customOrderCompleted;
await eventFan.addDestination(facebookPixel);
```

### Extend with new destinations

Have a new destination you want to add? Simply implement the `Destination` class:

```typescript
class CustomDestination implements Destination {
  initialise(): void {
    destinationNodeModule.initialise(this.eventKey);
  }

  // ...
}
```

Note that there is a helpful `loadScript` util exported, that you may want to use if you are loading third party scripts
from a url.

## Contributing

### Development environment

You can run `yarn dev` to open up a browser (with hot reloading) that shows your destination in action.

Thorough unit tests should be written for changes, as well as at least one E2E test to make sure it loads across all
major browsers.
