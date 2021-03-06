import { TEvent } from "../../types/TrackEvent";

interface VideoAdPlayingProps {
  /**
   * The unique ID of the ad asset.
   */
  ad_asset_id?: string;
  /**
   * Linear if ads are same for all users.
   */
  ad_load_type?: string;
  /**
   * The unique ID of the ad pod.
   */
  ad_pod_id?: string;
  /**
   * Position of the ad asset relative to other assets in the same pod.
   */
  ad_pod_position?: number;
  /**
   * The current index position in seconds of the playhead with respect to the length of the
   * ad.
   */
  ad_position?: number;
  /**
   * The ad creator, author, producer, or publisher.
   */
  ad_publisher?: string;
  /**
   * The title of the video ad.
   */
  ad_title?: string;
  /**
   * The ad type
   */
  ad_type?: string;
  /**
   * The unique ID of the overall session.
   */
  session_id?: string;
  /**
   * The total duration of the current ad asset in seconds.
   */
  total_ad_length?: number;
}

/**
 * Heartbeat event fired every N seconds that the ad plays
 */
export type VideoAdPlaying = TEvent<"Video Ad Playing", VideoAdPlayingProps>;
