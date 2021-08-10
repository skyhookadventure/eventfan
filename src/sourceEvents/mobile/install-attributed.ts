/**
 * Segment or an integrated partner can discern the source of an install
 */
export interface InstallAttributed {
  campaign?: any[] | boolean | number | number | null | CampaignObject | string;
  /**
   * Attribution provider
   */
  provider?: string;
}

export interface CampaignObject {
  /**
   * Ad creative name
   */
  ad_creative?: string;
  /**
   * Ad group name
   */
  ad_group?: string;
  /**
   * Content of the campaign
   */
  content?: string;
  /**
   * What type of link was used
   */
  medium?: string;
  /**
   * Name of the attributed campaign
   */
  name?: string;
  /**
   * Campaign source -- attributed ad network
   */
  source?: string;
}
