import EventFan from "./client/EventFan";
import Destination from "./destinations/Destination";
import FacebookPixel from "./destinations/facebookPixel/FacebookPixel";

// Client
export default EventFan;

// Destinations
export { Destination };
export { FacebookPixel };

// Event types
export { Ecommerce, Mobile, SAAS, Video } from "./sourceEvents/Events";

// Mocks for testing
export { mockPage, mockTrack, mockUser } from "./mocks";
