import { TEvent } from "../../types/TrackEvent";

interface SignedInProps {
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
 * User signs in to your service
 */
export type SignedIn = TEvent<"Signed In", SignedInProps>;
