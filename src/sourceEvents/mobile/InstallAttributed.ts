import { CampaignObject } from "./shared/CampaignObject";

import { TEvent } from "../../types/TrackEvent";

interface InstallAttributedProps {
  campaign?: any[] | boolean | number | number | null | CampaignObject | string;

  /**
   * Attribution provider
   */
  provider?: string;
}

/**
 * Segment or an integrated partner can discern the source of an install
 */
export type InstallAttributed = TEvent<
  "Install Attributed",
  InstallAttributedProps
>;
