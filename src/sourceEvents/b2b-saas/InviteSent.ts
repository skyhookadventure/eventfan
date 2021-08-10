import { TEvent } from "../../types/TrackEvent";

interface InviteSentProps {
  /**
   * Email address of the person receiving the invite
   */
  invitee_email: string;

  /**
   * First name of the person receiving the invite
   */
  invitee_first_name?: string;

  /**
   * Last name of the person receiving the invite
   */
  invitee_last_name?: string;

  /**
   * Role of the invitee
   */
  invitee_role?: string;
}

/**
 * User invites another user
 */
export type InviteSent = TEvent<"Invite Sent", InviteSentProps>;
