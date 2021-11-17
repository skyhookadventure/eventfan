import EventFan, { FacebookPixel } from "../..";
import Hotjar from "../../destinations/hotjar/Hotjar";

/**
 * Create a client with real destinations
 *
 * Note the IDs must all be from staging accounts with the destination so they can be shared freely on the internet.
 */
async function addEventFan() {
  const eventFan = new EventFan();

  await eventFan.addDestination(
    new FacebookPixel({ pixelId: "243635977408985" })
  );
  await eventFan.addDestination(new Hotjar({ siteID: "2705682" }));

  // Trigger a page track
  eventFan.page();
}

addEventFan();
