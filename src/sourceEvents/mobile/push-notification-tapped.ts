/**
 * User taps push notification associated with your app Collected automatically by iOS!
 */
export interface PushNotificationTapped {
  /**
   * Custom string if notification is “actionable“ Default: “Open”
   */
  action?:        string;
  push_campaign?: any[] | boolean | number | number | null | PushCampaignObject | string;
}

export interface PushCampaignObject {
  /**
   * Content of the notification
   */
  content?: string;
  /**
   * What type of link was pushed
   */
  medium?: string;
  /**
   * Campaign name
   */
  name?: string;
  /**
   * Push provider
   */
  source?: string;
}
