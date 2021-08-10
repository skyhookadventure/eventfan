export interface AdvancedMatching {
  /** Country */
  country?: string;
  /** City */
  ct?: string;
  /** Date of birth in format YYYYMMDD */
  db?: number;
  /** Email */
  em?: string;
  /** External user ID */
  external_id?: string;
  /** First name */
  fn?: string;
  /** Gender */
  ge?: "f" | "m";
  /** Last name */
  ln?: string;
  /** Phone number */
  ph?: number;
  /** State/province */
  st?: string;
  /** Zip or postal code */
  zp?: string;
}
