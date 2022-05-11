import type Destination from "./destinations/Destination";
import Drip from "./destinations/drip/Drip";
import EventFan from "./client/EventFan";
import FacebookPixel from "./destinations/facebookPixel/FacebookPixel";
import GA4 from "./destinations/ga4/GA4";
import Hotjar from "./destinations/hotjar/Hotjar";
import loadScript from "./utils/loadScript";
import Posthog from "./destinations/posthog/Posthog";
import * as allMocks from "./mocks";

// Client
export default EventFan;

// Libs
export { loadScript };

// Destinations
export type { Destination };
export { FacebookPixel, GA4, Hotjar, Posthog, Drip };

// Mocks for testing
const mocks = { ...allMocks }; // Fix parcel bug
export { mocks };

// React
export { EventFanProvider, useEventFan } from "./react";

// Types
export type { TEvent } from "./types/TrackEvent";
export type { Page, PageViewProps } from "./types/PageViewProps";
export type { User, IdentifyTraits } from "./types/User";
export type { Ecommerce, Mobile, SAAS, Video } from "./sourceEvents/Events";
