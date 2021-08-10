/**
 * New account is created
 */
export interface AccountCreated {
  /**
   * The name of the account being created
   */
  account_name: string;
  /**
   * The context array
   */
  context?: any[];
}
