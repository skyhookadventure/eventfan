import { CampaignObject } from "./shared/CampaignObject";

import { TEvent } from "../../types/TrackEvent";

interface PushNotificationTappedProps {
  /**
   * Custom string if notification is “actionable“ Default: “Open”
   */
  action?: string;

  push_campaign?:
    | any[]
    | boolean
    | number
    | number
    | null
    | CampaignObject
    | string;
}

/**
 * User taps push notification associated with your app Collected automatically by iOS!
 */
export type PushNotificationTapped = TEvent<
  "Push Notification Tapped",
  PushNotificationTappedProps
>;
