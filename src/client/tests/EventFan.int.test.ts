/* eslint-disable @typescript-eslint/dot-notation */
import EventFan from "../EventFan";
import "cross-fetch/polyfill";

const stagingRudderStackKey = "1uFnpaQiJmOxs4zG2jIon52HIhn";

describe("load", () => {
  it("loads the destinations", async () => {
    const eventFan = new EventFan();
    await eventFan.load(stagingRudderStackKey);
    expect(eventFan["destinations"].length).toBeGreaterThanOrEqual(3);
  });
});
