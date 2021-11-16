import { AdvancedMatching } from "./AdvancedMatching";

/**
 * Facebook Pixel Window Object
 *
 * https://developers.facebook.com/docs/facebook-pixel/get-started
 */
export interface FBQ {
  (
    eventType: "init",
    pixelId: string,
    advancedMatchingParameters?: AdvancedMatching
  ): void;

  (eventType: "track", eventName: string, properties?: any): void;

  disablePushState: boolean;
}
