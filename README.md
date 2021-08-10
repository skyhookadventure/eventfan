# Event Fan

[![Built with
typescript](https://badgen.net/badge/icon/typescript?icon=typescript&label)](https://www.typescriptlang.org/)

Send tracking/analytics events to multiple destinations (Google Analytics, Facebook, Rudderstack...).

## Key features

### 1. Emit Type-Safe Events

Use the included event types (e.g. "Order Completed") from the
RudderStack/Segment specifications, or create your own custom typings.

```typescript
// Example standard event
eventFan.track<Ecommerce.OrderCompleted>({
  eventName: "Order Completed",
  props: {
    order_id: "order_UUID",
    products: [{
        product_id: "product_UUID",
        // ...
    }]
    // ...
  }
})

// Example custom event
type CustomEvent = TEvent<"Custom Event Name", {
  iceCream: string;
}>
eventFan.track<CustomEvent>({
  eventName: "Custom Event Name", {
    icCream: "vanilla"
  }
})

```

### 2. Map events to destination event (Facebook Ads, Google Analytics..), with sensible defaults

Either use the default mappings (similar to RudderStack/Segment), or write your own:

```typescript
// Default "Order Completed" -> Facebook Pixel "Purchase" mapping
export default function orderCompleted({
  props,
}: OrderCompleted): TEvent<"Purchase", Purchase> {
  return {
    eventName: "Purchase",
    props: {
      content_ids: props.products.map((product) => product.product_id),
      content_type: ContentType.PRODUCT,
      contents: props.products.map((product) => ({
        id: product.product_id,
        quantity: product.quantity || 1, // Default quantity to 1
      })),
      currency: props.currency || "USD", // Default currency to USD
      value: props.total!,
    },
  };
}

// Or write your own...
export function customOrderCompleted({
  props,
}: CustomOrderCompleted): TEvent<"Purchase", Purchase> {
  // E.g. start with the default mapping
  const defaults = FacebookPixel.orderCompleted({ props });
  return {
    ...props,
    // And change the content type to always be a travel destination
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
