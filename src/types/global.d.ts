import { DripWindowObject } from "../destinations/drip/types/DripJsAPI";
import { FBQ } from "../destinations/facebookPixel/types/FBQ";
import { Gtag } from "../destinations/ga4/types/GtagWindow";
import {
  HotjarWindow,
  HotjarWindowSettings,
} from "../destinations/hotjar/types/HotjarWindow";

/**
 * Global Augmentations
 *
 * This is useful to simplify destination references to the global scope.
 */
declare global {
  interface Window {
    /** Facebook Pixel */
    fbq?: FBQ;
    _fbq?: FBQ;
    /** Hotjar */
    hj?: HotjarWindow;
    _hjSettings: HotjarWindowSettings;
    /** GA4 */
    dataLayer: Array<Array<string, string, object>>;
    gtag: Gtag;
    /** Posthog */
    posthog: any;
    /** Drip */
    _dcq: Array<any>;
    _dcs: DripWindowObject;
  }
}

// Trickery needed to augment the global scope within a browser context
// https://stackoverflow.com/questions/57132428/augmentations-for-the-global-scope-can-only-be-directly-nested-in-external-modul
export {};
