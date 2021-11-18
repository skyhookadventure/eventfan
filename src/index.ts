import EventFan from "./client/EventFan";
import Destination from "./destinations/Destination";
import FacebookPixel from "./destinations/facebookPixel/FacebookPixel";
import GA4 from "./destinations/ga4/GA4";
import Hotjar from "./destinations/hotjar/Hotjar";
import Posthog from "./destinations/posthog/Posthog";
import loadScript from "./utils/loadScript";

// Client
export default EventFan;

// Libs
export { loadScript };

// Destinations
export { Destination };
export { FacebookPixel, GA4, Hotjar, Posthog };

// Event types
export { Ecommerce, Mobile, SAAS, Video } from "./sourceEvents/Events";

// Mocks for testing
export * as mocks from "./mocks";

// React
export { EventFanProvider, useEventFan } from "./react";
