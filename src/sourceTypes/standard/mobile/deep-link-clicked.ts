/**
 * User clicks on a deep link associated with your app
 */
export interface DeepLinkClicked {
  /**
   * The deep link provider
   */
  deep_link_provider: string;
  /**
   * The deep link url clicked
   */
  deep_link_url: string;
}
