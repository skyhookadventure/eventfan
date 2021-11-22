import { v4 as uuidv4 } from "uuid";
import { User } from "../../types/User";
import type Destination from "../Destination";
import { DestinationName } from "../DestinationName";
import { Page } from "../../types/PageViewProps";
import {
  RudderStackIdentify,
  RudderStackPage,
  RudderStackTrack,
} from "./types/rudder";
import { TEvent } from "../../types/TrackEvent";

/**
 * RudderStack Config
 */
export interface RudderStackConfig {
  writeKey: string;
  dataPlaneURL?: string;
}

/**
 * RudderStack Destination
 */
export default class RudderStack implements Destination {
  private anonymousId: string;

  private config: RudderStackConfig;

  private userId?: string;

  constructor({
    writeKey,
    dataPlaneURL = "https://hosted.rudderlabs.com",
  }: RudderStackConfig) {
    // RudderStack uses an anonymous user ID where a signed-in user id is not available
    // To try and maintain this between session, we use local storage to maintain a value
    const key = "eventFanRSAnonymousUserID";
    const anonymousIdFromStorage = localStorage?.getItem(key);
    if (anonymousIdFromStorage) {
      this.anonymousId = anonymousIdFromStorage;
    } else {
      this.anonymousId = uuidv4();
      localStorage?.setItem(key, this.anonymousId);
    }

    // Set config
    this.config = { writeKey, dataPlaneURL };
  }

  private callRudderStackAPI(
    endpoint: "identify" | "track" | "page" | "screen" | "group" | "alias",
    body: object
  ): Promise<Response | undefined> {
    return fetch(`${this.config.dataPlaneURL}/v1/${endpoint}`, {
      headers: { Authorization: `Basic ${btoa(`${this.config.writeKey}:`)}` },
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  async identify(user: User): Promise<any> {
    this.userId = user.userId;

    const body: RudderStackIdentify = {
      userId: user.userId,
      anonymousId: user.userId ? undefined : this.anonymousId,
      traits: user.traits,
    };

    return this.callRudderStackAPI("identify", body);
  }

  async page(page: Page): Promise<any> {
    const body: RudderStackPage = {
      userId: this.userId,
      anonymousId: this.userId ? undefined : this.anonymousId,
      name: page.name,
      properties: page.properties,
    };

    return this.callRudderStackAPI("page", body);
  }

  async track(event: TEvent): Promise<any> {
    const body: RudderStackTrack = {
      userId: this.userId,
      anonymousId: this.userId ? undefined : this.anonymousId,
      event: event.name,
      properties: event.properties,
    };

    return this.callRudderStackAPI("track", body);
  }

  // eslint-disable-next-line class-methods-use-this
  initialise(): Promise<void> {
    // No initialisation needed
    return Promise.resolve();
  }

  name = DestinationName.RUDDERSTACK;

  // No initialisation needed
  isLoaded = true;
}
