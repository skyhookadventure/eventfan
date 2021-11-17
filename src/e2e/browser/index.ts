import EventFan, { FacebookPixel } from "../../index";
import Hotjar from "../../destinations/hotjar/Hotjar";
import GA4 from "../../destinations/ga4/GA4";
import Posthog from "../../destinations/posthog/Posthog";

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
  await eventFan.addDestination(
    new Posthog({
      teamApiKey: "phc_CrjkOExGDLy4CXCwuht6eEIHDM7VDNsTXAI3tpTATim",
    })
  );

  // Trigger a page track
  eventFan.page();
}

addEventFan();
