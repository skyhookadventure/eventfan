---
to: <%= h.changeCase.lower(name) %>/<%= h.changeCase.title(name) %>.ts
---
import { User } from "../../types/User";
import Destination from "../Destination";
import { DestinationName } from "../DestinationName";
import loadScript from "../../utils/loadScript";

/**
 * <%= h.changeCase.title(name) %> Config
 */
export interface <%= h.changeCase.title(name) %>Config {
  // Add your config here
}

/**
 * <%= h.changeCase.title(name) %> Destination
 */
export default class <%= h.changeCase.title(name) %> implements Destination {
  private <%= h.changeCase.lower(name) %> = {}; // Change to third party lib ref (often `window.something`)

  constructor(protected config: <%= h.changeCase.title(name) %>Config) {}

  /**
   * Identify
   */
  identify(user: User): void {
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
