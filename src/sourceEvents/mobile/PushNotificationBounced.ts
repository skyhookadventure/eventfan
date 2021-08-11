import { CampaignObject } from "./shared/CampaignObject";

import { TEvent } from "../../types/TrackEvent";

interface PushNotificationBouncedProps {
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
 * Push notification from a provider bounces
 */
export type PushNotificationBounced = TEvent<
  "Push Notification Bounced",
  PushNotificationBouncedProps
>;
