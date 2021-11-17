import EventFan, { FacebookPixel } from "../..";
import Hotjar from "../../destinations/hotjar/Hotjar";

/**
 * Create a client with real destinations
 *
 * Note the IDs must all be from staging accounts with the destination so they can be shared freely on the internet.
 */
const eventFan = new EventFan();

eventFan.addDestination(new FacebookPixel({ pixelId: "243635977408985" }));
eventFan.addDestination(new Hotjar({ siteID: "2705682" }));

eventFan.page();
