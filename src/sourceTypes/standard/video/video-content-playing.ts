/**
 * Heartbeat every N (we recommend 10) seconds to track how far into the content the user is
 * currently viewing.
 */
export interface VideoContentPlaying {
  /**
   * ISO 8601 Date String for the original air date or published date.
   */
  airdate?: string;
  /**
   * The current kbps.
   */
  bitrate?: number;
  /**
   * The channel in which the video content is playing
   */
  channel?: string;
  /**
   * Asset Id of the video playing/about to be played
   */
  content_asset_id?: string;
  /**
   * Pod Id of the video playing/about to be played
   */
  content_pod_id?: string;
  /**
   * Short description of the video content.
   */
  description?: string;
  /**
   * The episode number if applicable.
   */
  episode?: string;
  /**
   * The average fps.
   */
  framerate?: number;
  /**
   * true if content is a full episode and false otherwise.
   */
  full_episode?: boolean;
  /**
   * The genre of the content, ie. ‘comedy’, ‘action’.
   */
  genre?: string;
  /**
   * Arbitrary keywords/tags that describe/categorize the content.
   */
  keywords?: any[];
  /**
   * True f the playback will be a livetream
   */
  livestream?: boolean;
  /**
   * Position of product in the list
   */
  position?: number;
  /**
   * The name of the program, show, etc. of the content if applicable.
   */
  program?: string;
  /**
   * The content creator, author, producer, or publisher.
   */
  publisher?: string;
  /**
   * The season number if applicable.
   */
  season?: string;
  /**
   * The unique ID of the overall session.
   */
  session_id?: string;
  /**
   * User's salutation
   */
  title?: string;
  /**
   * Total duration of the playback in seconds
   */
  total_length?: number;
}
