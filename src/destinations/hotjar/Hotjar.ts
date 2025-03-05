 
 
 
import { User } from "../../types/User";
import type Destination from "../Destination";
import { DestinationName } from "../DestinationName";
import loadScript from "../../utils/loadScript";
import { HotjarWindow } from "./types/HotjarWindow";

/**
 * Hotjar Config
 */
export interface HotjarConfig {
  siteID: string;
}

/**
 * Hotjar Destination
 */
export default class Hotjar implements Destination {
  private hj: HotjarWindow = window.hj as HotjarWindow;

  constructor(protected config: HotjarConfig) {
    window._hjSettings = { hjid: parseInt(config.siteID), hjsv: 6 };
  }

  /**
   * Identify
   *
   * Note Hotjar does not mind what format the traits are sent in.
   * https://help.hotjar.com/hc/en-us/articles/360033640653-Identify-API-Reference
   */
  async identify(user: User): Promise<void> {
    this.hj("identify", user.userId, user.traits);
  }

  async initialise(): Promise<void> {
    // Run initial Hotjar Setup
    // https://help.hotjar.com/hc/en-us/articles/115009336727-Manually-Adding-the-Tracking-Code
    if (!this.hj) {
      window.hj = ((...args: any[]) => {
        (window.hj!.q = window.hj?.q || []).push(args);
      }) as any;
      this.hj = window.hj!;
    }

    // Load the script
    await loadScript(
      "event-fan-hotjar",
      `https://static.hotjar.com/c/hotjar-${this.config.siteID}.js?sv=${window._hjSettings.hjsv}`
    );

    // Set the destination as loaded
    this.isLoaded = true;
  }

  name = DestinationName.HOTJAR;

  isLoaded = false;
}
