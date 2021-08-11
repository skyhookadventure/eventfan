import { CampaignObject } from "./shared/CampaignObject";

import { TEvent } from "../../types/TrackEvent";

interface PushNotificationReceivedProps {
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
 * Push notification received by your app Collected automatically by iOS!
 */
export type PushNotificationReceived = TEvent<
  "Push Notification Received",
  PushNotificationReceivedProps
>;
