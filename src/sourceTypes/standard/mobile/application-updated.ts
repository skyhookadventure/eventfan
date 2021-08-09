/**
 * User updates the app Collected automatically!
 */
export interface ApplicationUpdated {
  /**
   * Build number of the installed app
   */
  build?: number;
  /**
   * Previously recorded build
   */
  previous_build?: number;
  /**
   * Previously recorded version
   */
  previous_version?: string;
  /**
   * Version installed
   */
  version?: string;
}
