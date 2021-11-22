---
to: <%= h.changeCase.lower(name) %>/<%= h.changeCase.pascal(name) %>.ts
---
import { User } from "../../types/User";
import type Destination from "../Destination";
import { DestinationName } from "../DestinationName";
import loadScript from "../../utils/loadScript";

/**
 * <%= h.changeCase.pascal(name) %> Config
 */
export interface <%= h.changeCase.pascal(name) %>Config {
  // Add your config here
}

/**
 * <%= h.changeCase.pascal(name) %> Destination
 */
export default class <%= h.changeCase.pascal(name) %> implements Destination {
  private <%= h.changeCase.lower(name) %> = {}; // Change to third party lib ref (often `window.something`)

  constructor(protected config: <%= h.changeCase.pascal(name) %>Config) {}

  /**
   * Identify
   */
  async identify(user: User): Promise<void> {
    // Update
    this.<%= h.changeCase.lower(name) %>("identify", user.userId, user.traits);
  }

  async initialise(): Promise<void> {
    // Run initial Setup

    // Load the script
    await loadScript(
      "event-fan-<%= h.changeCase.lower(name) %>",
      `something.com/index.js`
    );

    // Set the destination as loaded
    this.isLoaded = true;
  }

  name = DestinationName.<%= h.changeCase.upper(name) %>;

  isLoaded = false;
}
