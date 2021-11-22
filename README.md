# Event Fan

[![Built with
typescript](https://badgen.net/badge/icon/typescript?icon=typescript&label)](https://www.typescriptlang.org/)
[![Supports react](https://badgen.net/badge/supports/react/green)](https://reactjs.org/)

Send tracking events (e.g. `Order Completed`) to multiple destinations (Google Analytics, Facebook...), with the correct
formatting applied automatically.

## Key Features

- Tiny (2kb compressed) & fast core lib.
- Great developer experience - send events (e.g. `page`/`track`/`identify`) immediately and EventFan will replay them for
  each destination as soon as they finish loading.
- Supports React and pure JavaScript (on the browser).
- TypeScript types included.
- Easy to extend.
- High reliability with unit/integration/e2e testing. Handles network errors with destinations (e.g. failing to load a
  third party script) gracefully.

## Quick Start

### Install

Install directly (will be on `npmjs` in the future):

```bash
yarn add https://github.com/alan-cooney/eventfan/releases/download/latest/node.tgz
```

Or load in the browser:

```html
<script
  id="eventFanModule"
  type="module"
  src="https://yourCdn.com/browser/browser.js"
  async
></script>
<script
  id="eventFanNoModule"
  nomodule
  src="https://yourCdn.com/browser-legacy/browser.js"
  async
></script>
```

### Initialise Client & Destinations

Initialise just once in your application:

```typescript
import EventFan, { FacebookPixel } from "event-fan";

const eventFan = new EventFan();
eventFan.load("YOUR_WRITE_KEY", "OPTIONAL_RUDDER_URL");
```

#### React

Instead for React, wrap your app with the provider component:

```typescript
export default function App() {
  return (
    <EventFanProvider rudderStack={{ writeKey: "YOUR_WRITE_KEY" }}>
      <h1>Your app</h1>
    </EventFanProvider>
  );
}
```

Note that for React, you can then access the methods (detailed below) with the `useEventFan` hook:

```typescript
const { track, page, identify } = useEventFan();

useEffect(() => {
  track<Ecommerce.CheckoutStarted>("Checkout Started", {
    value: 100.0,
  });
}, []);
```

### Track page loads

You must fire page calls on each page view. By default it will use the page `<Title/>` and url, unless you specify these:

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
each destination (e.g. in this case Facebook Pixel's `Purchase` event):

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

  // And change some properties (in this case `content_type`)
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
  initialise(): Promise<void> {
    destinationNodeModule.initialise(this.eventKey);
  }

  // ...
}
```

Note that there is a helpful `loadScript` util exported, that you may want to use if you are loading third party scripts
from a url.

## Testing

To test in your application, we recommend using mocks & spys for unit tests, and then connecting to real staging destinations
for end-to-end tests.

### Unit testing example

```typescript
const mockTrack = jest.fn();
jest.spyOn(eventFanInstance, "track").mockImplementation(mockTrack);

// Do something, then...

expect(mockTrack).toHaveBeenCalledWith({
  // Expected Call
});
```

Note that in react you'll need to spy on useEventFan as follows:

```typescript
import * as EventFan from "eventfan";

// Within your test:
const mockTrack = jest.fn();
jest.spyOn(EventFan, "useEventFan").mockReturnValue({ track: mockTrack });
```

### End to End Tests

We recommend looking in `/src/e2e/` for examples of end-to-end tests.

## Contributing

### Adding a destination

1. Codegen the basics by running this from the destinations directory:

```bash
cd /src/destinations
npx hygen generator new [destinationName]
```

2. Add the destination name to `/src/destinations/DestinationName.ts`

3. Create the initialise, identify, page and track methods in your destination. You can run `yarn dev` whilst doing this
   to see the impact in a real browser, with hot reloading (note you need to update `/e2e/react` to add the destination
   staging credentials to do this). Make sure to add full unit testing and at least one e2e test.

4. Add the destination to the EventFan client as a dynamic import (on the load method).

### Adding an event mapping

These are added within `/src/destinations/[destination]/mapping`. Make sure to add corresponding TypeScript types and a
unit test.
