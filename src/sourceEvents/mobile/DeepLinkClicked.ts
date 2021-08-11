import { TEvent } from "../../types/TrackEvent";

interface DeepLinkClickedProps {
  /**
   * The deep link provider
   */
  deep_link_provider: string;
  /**
   * The deep link url clicked
   */
  deep_link_url: string;
}

/**
 * User clicks on a deep link associated with your app
 */
export type DeepLinkClicked = TEvent<"Deep Link Clicked", DeepLinkClickedProps>;
