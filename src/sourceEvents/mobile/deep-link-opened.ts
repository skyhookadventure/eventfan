/**
 * User opens your app via a deep link
 */
export interface DeepLinkOpened {
  /**
   * The deep link provider
   */
  deep_link_provider: string;
  /**
   * The deep link url clicked
   */
  deep_link_url: string;
}
