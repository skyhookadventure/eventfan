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

  it("fails gracefully", async () => {
    const mockConsole = jest.fn();
    jest.spyOn(console, "log").mockImplementation(mockConsole);
    const eventFan = new EventFan();
    await eventFan.load(stagingRudderStackKey, "https://fail.rudderlabs.com");
    expect(mockConsole.mock.calls[0][0]).toMatchInlineSnapshot(
      `"Failed to load destinations from RudderStack."`
    );
    expect(eventFan["destinations"].length).toBe(0);
  });
});
