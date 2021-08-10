import { TEvent } from "../../types/TrackEvent";

interface AccountAddedUserProps {
  /**
   * The context array
   */
  context?: any[];

  /**
   * Permission group for the user
   */
  role?: string;
}

/**
 * User is added to a group or account
 */
export type AccountAddedUser = TEvent<
  "Account Added User",
  AccountAddedUserProps
>;
