/* eslint-disable new-cap */
import type { RudderStack } from "../../types/RudderStack";
import type EventFan from "../EventFan";
import { DestinationName } from "../../destinations/DestinationName";

/**
 * Dynamically Import Destination
 *
 * We dynamically import each destination to avoid the bundle including all destinations (event those which are not used).
 *
 * When you add a new destination to EventFan, you will also need to add a dynamic import in here so that it can be
 * loaded asynchronously by EventFan.
 */
export async function dynamicImportDestination(
  this: EventFan,
  destinationSettings: {
    config: RudderStack["source"]["destinations"][0]["config"];
    destinationDefinition: Pick<
      RudderStack["source"]["destinations"][0]["destinationDefinition"],
      "name"
    >;
  }
): Promise<void> {
  const destinationName = destinationSettings.destinationDefinition.name;
  let mod: { default: any }; // Initialise variable for the dynamically imported module

  try {
    switch (destinationName) {
      case DestinationName.DRIP:
        mod = await import("../../destinations/drip/Drip");
        break;

      case DestinationName.FACEBOOK_PIXEL:
        mod = await import("../../destinations/facebookPixel/FacebookPixel");
        break;

      case DestinationName.GA4:
        mod = await import("../../destinations/ga4/GA4");
        break;

      case DestinationName.HOTJAR:
        mod = await import("../../destinations/hotjar/Hotjar");
        break;

      case DestinationName.POSTHOG:
        mod = await import("../../destinations/posthog/Posthog");
        break;

      case DestinationName.RUDDERSTACK:
        mod = await import("../../destinations/rudderStack/RudderStack");
        break;

      default:
        throw new Error(`EventFan does not support ${destinationName} yet.`);
    }

    // Add the destination
    await this.addDestination(new mod.default(destinationSettings.config));
  } catch (err) {
    // Note that where this is transpiled to use polyfills (to create a regular `<script>` tag with an event handler) by
    // e.g. Webpack/SWC Pack, the error message can be quite unhelpful (typically it just shows a timeout error where it
    // could have actually been a 404 or connection load). Also note that some imports will always fail with certain AdBlock
    // settings enabled (e.g. if they block anything referencing a Facebook Pixel) so you should expect this error
    // message to appear in logs regardless of any underlying issues.
    console.warn(
      `Failed to dynamically import ${destinationName}. The error given was: ${err}`
    );
  }
}

export default function loadDestinationsDynamically(
  this: EventFan,
  destinations: Array<
    Pick<
      RudderStack["source"]["destinations"][0],
      "config" | "destinationDefinition" | "enabled"
    >
  >
) {
  // Filter to only those destinations that are enabled
  const enabledDestinations = destinations.filter((i) => i.enabled === true);

  return Promise.all(
    enabledDestinations.map((destination) =>
      dynamicImportDestination.call(this, destination)
    )
  );
}
