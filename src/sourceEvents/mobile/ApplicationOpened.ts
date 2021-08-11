import { TEvent } from "../../types/TrackEvent";

interface ApplicationOpenedProps {
  /**
   * Build number of the installed app
   */
  build?: number;
  /**
   * If application transitioned from “Background” to “Inactive” state prior to foregrounding
   * (as opposed to from “Not Running” state). Automatically collected on iOS only.
   */
  from_background?: boolean;
  referring_application?: string;
  /**
   * The value of UIApplicationLaunchOptionsURLKey from launchOptions (auto-collected on iOS
   * only)
   */
  url?: string;
  /**
   * Version installed
   */
  version?: string;
}

/**
 * User launches or foregrounds your mobile app after the first open Collected Automatically!
 */
export type ApplicationOpened = TEvent<
  "Application Opened",
  ApplicationOpenedProps
>;
