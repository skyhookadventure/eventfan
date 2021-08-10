import { TEvent } from "../../types/TrackEvent";

interface AccountDeletedProps {
  /**
   * The name of the account being created
   */
  account_name: string;
  /**
   * The context array
   */
  context?: any[];
}

/**
 * Account is deleted
 */
export type AccountDeleted = TEvent<"Account Deleted", AccountDeletedProps>;
