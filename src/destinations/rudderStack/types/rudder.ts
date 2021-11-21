import { Page } from "../../../types/PageViewProps";
import { TEvent } from "../../../types/TrackEvent";
import { User } from "../../../types/User";

export interface RequestBody {
  anonymousId?: string;
  userId?: string;
}

export type RudderStackIdentify = RequestBody & {
  traits: User["traits"];
};

export type RudderStackTrack = RequestBody & {
  event: TEvent["name"];
  properties?: TEvent["properties"];
};

export type RudderStackPage = RequestBody & {
  name: Page["name"];
  properties?: Page["properties"];
};
