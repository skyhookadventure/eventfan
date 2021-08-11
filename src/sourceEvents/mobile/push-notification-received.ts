/**
 * Push notification received by your app Collected automatically by iOS!
 */
export interface PushNotificationReceived {
  push_campaign?:
    | any[]
    | boolean
    | number
    | number
    | null
    | PushCampaignObject
    | string;
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
