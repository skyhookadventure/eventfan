/**
 * User invites another user
 */
export interface InviteSent {
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
