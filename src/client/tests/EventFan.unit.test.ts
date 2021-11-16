/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable max-classes-per-file */
import EventFan from "../EventFan";
import Destination from "../../destinations/Destination";
import { DestinationName } from "../../destinations/DestinationName";
import mockUser from "../../mocks/mockUser";
import mockPage from "../../mocks/mockPage";
import mockTrack from "../../mocks/mockTrack";

/**
 * Mock Destinations
 *
 * These are used for the tests below, to spy on method calls etc.
 */
class MinimalMockDestination implements Destination {
  initialise = jest.fn();

  isLoaded = true;

  name = "MOCK_DESTINATION" as DestinationName;

  track = jest.fn();
}

class MockDestination extends MinimalMockDestination {
  // Add a single event mapping to test
  eventMappings = {
    "Order Completed": () => {
      return { name: "ModifiedEventName", properties: { modified: true } };
    },
  };

  identify = jest.fn();

  page = jest.fn();
}

describe("constructor", () => {
  it("initialises without errors (no destinations)", () => {
    new EventFan();
  });

  it("initialises without errors (mock destination)", () => {
    new EventFan({ destinations: [new MockDestination()] });
  });
});

describe("addDestination", () => {
  it("replays the user event if specified", async () => {
    const eventFan = new EventFan();
    await eventFan.identify(mockUser.userId, mockUser.traits);
    const destination = new MockDestination();
    await eventFan.addDestination(destination);
    expect(destination.identify).toHaveBeenCalledWith(mockUser);
  });

  it("replays page events", async () => {
    const eventFan = new EventFan();
    await eventFan.page(mockPage.properties!.title, mockPage);
    const destination = new MockDestination();
    await eventFan.addDestination(destination);
    expect(destination.page).toHaveBeenCalled();
  });

  it("works with a minimal destination", async () => {
    const eventFan = new EventFan();
    await eventFan.identify(mockUser.userId, mockUser.traits);
    await eventFan.page(mockPage.properties!.title, mockPage);
    const destination = new MinimalMockDestination();
    await eventFan.addDestination(destination);
  });
});

describe("identify", () => {
  it("forwards the call to each destination", async () => {
    const destination = new MockDestination();
    const eventFan = new EventFan({
      destinations: [destination, new MinimalMockDestination()],
    });
    await eventFan.identify("userID", mockUser.traits);
    expect(destination.identify).toHaveBeenCalledWith(mockUser);
  });

  it("calls the callback", async () => {
    const callback = jest.fn();
    const eventFan = new EventFan();
    await eventFan.identify("userID", mockUser.traits, undefined, callback);
    expect(callback).toHaveBeenCalled();
  });
});

describe("page", () => {
  it("adds the event to history", async () => {
    const eventFan = new EventFan();
    await eventFan.page(mockPage.name, mockPage);

    // Access the private history property (dynamically to avoid type errors)
    const privateHistory = eventFan["eventHistory"];

    const page = privateHistory[0].page!;
    expect(page.name).toBe(mockPage.properties!.title);
    expect(page.properties).toBeTruthy();
    expect(page.options?.originalTimestamp).toBeTruthy();
  });

  it("sets the default properties (e.g. url)", async () => {
    const eventFan = new EventFan();
    await eventFan.page();

    // Access the private history property (dynamically to avoid type errors)
    const privateHistory = eventFan["eventHistory"];

    const properties = privateHistory[0].page!.properties!;
    expect(properties.title).toBe(document.title);
    expect(properties.url).toBe(window.location.href);
    expect(properties.path).toBe(window.location.pathname);
  });

  it("forwards the call to each destination", async () => {
    const destination = new MockDestination();
    const eventFan = new EventFan({
      destinations: [destination, new MinimalMockDestination()],
    });

    await eventFan.page(mockPage.properties!.title, mockPage);
    expect(destination.page).toHaveBeenCalled();
  });

  it("calls the callback", async () => {
    const callback = jest.fn();
    const eventFan = new EventFan();
    await eventFan.page(
      mockPage.properties!.title,
      mockPage,
      undefined,
      callback
    );
    expect(callback).toHaveBeenCalled();
  });
});

describe("track", () => {
  it("adds the event to history", async () => {
    const eventFan = new EventFan();
    await eventFan.track(mockTrack.name, mockTrack.properties);

    // Access the private history property (dynamically to avoid type errors)
    const privateHistory = eventFan["eventHistory"];

    expect(privateHistory[0].track!.name).toBe(mockTrack.name);
    expect(privateHistory[0].track!.properties).toBe(mockTrack.properties);
    expect(privateHistory[0].track!.options?.originalTimestamp).toBeTruthy();
  });

  it("forwards the call to each loaded destination", async () => {
    const destination = new MockDestination();
    const eventFan = new EventFan({
      destinations: [destination, new MinimalMockDestination()],
    });
    await eventFan.track(mockTrack.name, mockTrack.properties);
    expect(destination.track).toHaveBeenCalledWith(mockTrack);
  });

  it("applies event mappings if they exist on each destination", async () => {
    const destination = new MockDestination();
    const eventFan = new EventFan({ destinations: [destination] });
    await eventFan.track("Order Completed", mockTrack.properties);
    expect(destination.track).toHaveBeenCalledWith({
      name: "ModifiedEventName",
      properties: { modified: true },
    });
  });

  it("calls the callback", async () => {
    const callback = jest.fn();
    const eventFan = new EventFan();
    await eventFan.track(
      mockTrack.name,
      mockTrack.properties,
      undefined,
      callback
    );
    expect(callback).toHaveBeenCalled();
  });
});
