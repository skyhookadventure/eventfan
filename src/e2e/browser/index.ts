import EventFan, { FacebookPixel } from "../../index";
import Hotjar from "../../destinations/hotjar/Hotjar";
import GA4 from "../../destinations/ga4/GA4";

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
  await eventFan.addDestination(new GA4({ measurementId: "GTM-TNBDGJR" }));

  // Trigger a page track
  eventFan.page();
}

addEventFan();
