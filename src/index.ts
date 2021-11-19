import Destination from "./destinations/Destination";
import Drip from "./destinations/drip/Drip";
import EventFan from "./client/EventFan";
import FacebookPixel from "./destinations/facebookPixel/FacebookPixel";
import GA4 from "./destinations/ga4/GA4";
import Hotjar from "./destinations/hotjar/Hotjar";
import loadScript from "./utils/loadScript";
import Posthog from "./destinations/posthog/Posthog";

// Client
export default EventFan;

// Libs
export { loadScript };

// Destinations
export { Destination };
export { FacebookPixel, GA4, Hotjar, Posthog, Drip };

// Event types
export { Ecommerce, Mobile, SAAS, Video } from "./sourceEvents/Events";

// Mocks for testing
export * as mocks from "./mocks";

// React
export { EventFanProvider, useEventFan } from "./react";
