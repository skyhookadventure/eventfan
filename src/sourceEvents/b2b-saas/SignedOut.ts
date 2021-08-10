import { TEvent } from "../../types/TrackEvent";

interface SignedOutProps {
  /**
   * The context array
   */
  context?: any[];

  /**
   * The username of the user
   */
  username: string;
}

/**
 * User signs out for your service
 */
export type SignedOut = TEvent<"Signed Out", SignedOutProps>;
