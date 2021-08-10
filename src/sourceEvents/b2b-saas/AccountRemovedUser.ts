import { TEvent } from "../../types/TrackEvent";

interface AccountRemovedUserProps {
  /**
   * The context array
   */
  context?: any[];
}

/**
 * User is removed from a group or account
 */
export type AccountRemovedUser = TEvent<
  "Account Removed User",
  AccountRemovedUserProps
>;
