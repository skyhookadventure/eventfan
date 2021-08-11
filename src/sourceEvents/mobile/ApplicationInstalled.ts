import { TEvent } from "../../types/TrackEvent";

interface ApplicationInstalledProps {
  /**
   * Build number of the installed app
   */
  build?: number;
  /**
   * Version installed
   */
  version?: string;
}

/**
 * User first opens your mobile app. Collected automatically!
 */
export type ApplicationInstalled = TEvent<
  "Application Installed",
  ApplicationInstalledProps
>;
