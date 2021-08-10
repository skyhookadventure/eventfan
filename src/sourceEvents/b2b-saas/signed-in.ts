/**
 * User signs in to your service
 */
export interface SignedIn {
  /**
   * The context array
   */
  context?: any[];
  /**
   * The username of the user
   */
  username: string;
}
