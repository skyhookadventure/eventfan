/* eslint-disable @typescript-eslint/dot-notation */
import EventFan from "../EventFan";
import "cross-fetch/polyfill";

const stagingRudderStackKey = "1uFnpaQiJmOxs4zG2jIon52HIhn";

jest.setTimeout(10000);

describe("load", () => {
  it("loads the destinations", async () => {
    const eventFan = new EventFan();
    const mockAddDestination = jest.fn();
    jest
      .spyOn(eventFan, "addDestination")
      .mockImplementation(mockAddDestination);
    await eventFan.load(stagingRudderStackKey);

    expect(mockAddDestination).toHaveBeenCalled();
  });

  it("fails gracefully", async () => {
    const mockConsole = jest.fn();
    jest.spyOn(console, "error").mockImplementation(mockConsole);
    const eventFan = new EventFan();
    await eventFan.load(stagingRudderStackKey, "https://fail.rudderlabs.com");
    expect(mockConsole.mock.calls[0][0]).toMatchInlineSnapshot(
      `"Failed to load destinations from RudderStack."`
    );
    expect(eventFan["destinations"].length).toBe(0);
  });
});
