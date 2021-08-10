import { TEvent } from "../../types/TrackEvent";

interface AccountCreatedProps {
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
 * New account is created
 */
export type AccountCreated = TEvent<"Account Created", AccountCreatedProps>;
