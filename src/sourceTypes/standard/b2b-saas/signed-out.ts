/**
 * User signs out for your service
 */
export interface SignedOut {
  /**
   * The context array
   */
  context?: any[];
  /**
   * The username of the user
   */
  username: string;
}
