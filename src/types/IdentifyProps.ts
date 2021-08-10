/**
 * Identify Event Properties
 *
 * Similar to the Segment/RudderStack properties at:
 * https://segment.com/docs/connections/spec/identify/#traits
 */
export interface IdentifyProps {
  address?: {
    city?: string;
    country?: string;
    postalCode?: string;
    state?: string;
    street?: string;
  };
  age?: number;
  avatar?: string;
  birthday?: Date;
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
  gender?: string;
  id?: string;
  lastName?: string;
  name?: string;
  phone?: string;
  title?: string;
  username?: string;
  website?: string;
}
