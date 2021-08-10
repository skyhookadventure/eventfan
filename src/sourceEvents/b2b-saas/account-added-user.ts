/**
 * User is added to a group or account
 */
export interface AccountAddedUser {
  /**
   * The context array
   */
  context?: any[];
  /**
   * Permission group for the user
   */
  role?: string;
}
