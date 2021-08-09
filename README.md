# Event Fan

Send tracking/analytics events to multiple destinations (Google Analytics, Facebook, Rudderstack...).

[![Built with
typescript](https://badgen.net/badge/icon/typescript?icon=typescript&label)](https://www.typescriptlang.org/)

## Key features

### 1. Emit Type-Safe Events

Emit default events (e.g. "Order Completed") from the
RudderStack/Segment specifications, or use your own custom typings.

Then run the codegen to create your unique client, so that you can run e.g.

```typescript
// TypeScript
eventFan.ecommerce.orderCompleted({
    order_id: string;
    products: [{
        product_id: string;
        // ...
    }]
    // ...
})
```

_Event specifications are defined with JSON Schemas. They can then be converted into types for Ruby, JavaScript, Flow, Rust, Kotlin,
Dart, Python, C#, Go, C++, Java, TypeScript, Swift, Objective-C, Elm, Pike, Prop-Types, Haskell, or any other language
supported by [QuickType](https://github.com/quicktype/quicktype)._

### 2. Map events to destinations (Facebook Ads, Google Analytics..) using defaults or TypeScript snippets

Either use the default mappings (similar to RudderStack/Segment), or write your own:

```typescript
// Default "Order Completed" -> Facebook Pixel "Purchase" mapping
export default function orderCompleted(
  props: OrderCompleted
): DestinationEvent<Purchase> {
  return {
    name: "Purchase",
    properties: {
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
```
