import { TEvent } from "../../types/TrackEvent";

interface SignedUpProps {
  /**
   * The context array
   */
  context?: any[];

  /**
   * User's email address
   */
  email: string;

  /**
   * User's first name
   */
  first_name?: string;

  /**
   * User's last name
   */
  last_name?: string;

  /**
   * User's phone number
   */
  phone?: string;

  /**
   * The type of signup (viral or organic)
   */
  signup_type?: string;

  /**
   * User's salutation
   */
  title?: string;

  /**
   * The username of the user
   */
  username: string;
}

/**
 * User signs up for your service
 */
export type SignedUp = TEvent<"Signed Up", SignedUpProps>;
