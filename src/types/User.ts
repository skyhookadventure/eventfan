import { CountryCodes } from "postal-address-field-names";

/**
 * Identify Event Properties
 *
 * Similar to the Segment/RudderStack properties at:
 * https://segment.com/docs/connections/spec/identify/#traits
 */
export interface IdentifyTraits {
  address?: {
    city?: string;
    country?: CountryCodes;
    postalCode?: string;
    state?: string;
    street?: string;
  };
  age?: number;
  avatar?: string;
  /** UTC Date as YYYY-MM-DD */
  birthday?: string;
  company?: {
    name?: string;
    id?: string | number;
    industry?: string;
    employee_count?: number;
    plan?: string;
  };
  createdAt?: Date;
  description?: string;
  email?: string;
  firstName?: string;
  gender?: Gender;
  id?: string;
  lastName?: string;
  name?: string;
  phone?: string;
  title?: string;
  username?: string;
  website?: string;
}

export interface User {
  userId: string;
  traits: IdentifyTraits;
  options?: { originalTimestamp?: Date };
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}
