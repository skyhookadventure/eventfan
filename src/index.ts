import EventFan from "./client/EventFan";
import Destination from "./destinations/Destination";
import FacebookPixel from "./destinations/facebookPixel/FacebookPixel";
import loadScript from "./utils/loadScript";

// Client
export default EventFan;

// Libs
export { loadScript };

// Destinations
export { Destination };
export { FacebookPixel };

// Event types
export { Ecommerce, Mobile, SAAS, Video } from "./sourceEvents/Events";

// Mocks for testing
export { mockPage, mockTrack, mockUser } from "./mocks";
