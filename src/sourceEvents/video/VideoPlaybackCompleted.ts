import { TEvent } from "../../types/TrackEvent";

interface VideoPlaybackCompletedProps {
  /**
   * false if the user has any ad blockers
   */
  ad_enabled?: boolean;
  /**
   * The current kbps.
   */
  bitrate?: number;
  /**
   * Asset Id of the video playing/about to be played
   */
  content_asset_id?: string;
  /**
   * Pod Id of the video playing/about to be played
   */
  content_pod_id?: string;
  /**
   * The average fps.
   */
  framerate?: number;
  /**
   * true if playback is in full screen mode
   */
  full_screen?: boolean;
  /**
   * True f the playback will be a livetream
   */
  livestream?: boolean;
  /**
   * Position of product in the list
   */
  position?: number;
  /**
   * The quality of the video
   */
  quality?: string;
  /**
   * The unique ID of the overall session.
   */
  session_id?: string;
  /**
   * The sound level of the playback
   */
  sound?: number;
  /**
   * Total duration of the playback in seconds
   */
  total_length?: number;
  /**
   * The name of the video player (ie ‘youtube’, ‘vimeo’).
   */
  video_player?: string;
}

/**
 * Playback is complete and only when the session is finished
 */
export type VideoPlaybackCompleted = TEvent<
  "Video Playback Completed",
  VideoPlaybackCompletedProps
>;
