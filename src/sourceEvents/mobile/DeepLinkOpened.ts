import { TEvent } from "../../types/TrackEvent";

interface DeepLinkOpenedProps {
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
 * User opens your app via a deep link
 */
export type DeepLinkOpened = TEvent<"Deep Link Opened", DeepLinkOpenedProps>;
