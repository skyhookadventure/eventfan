/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable max-classes-per-file */
import EventFan from "../EventFan";
import Destination from "../../destinations/Destination";
import { DestinationName } from "../../destinations/DestinationName";
import { PageViewProps } from "../../types/PageViewProps";
import { IdentifyTraits } from "../../types/IdentifyProps";
import { TEvent } from "../../types/TrackEvent";

/**
 * Mock Destination
 *
 * This is used for the tests below, to spy on method calls etc.
 */
class MockDestination implements Destination {
  // Add a single event mapping to test
  eventMappings = {
    "Order Completed": () => {
      return { name: "ModifiedEventName", properties: { modified: true } };
    },
  };

  identify = jest.fn();

  initialise = jest.fn();

  isLoaded = true;

  name = "MOCK_DESTINATION" as DestinationName;

  page = jest.fn();

  track = jest.fn();
}

describe("constructor", () => {
  it("initialises without errors (no destinations)", () => {
    new EventFan();
  });

  it("initialises without errors (mock destination)", () => {
    new EventFan({ destinations: [new MockDestination()] });
  });
});

describe("identify", () => {
  it("forwards the call to each destination", async () => {
    const destination = new MockDestination();
    const eventFan = new EventFan({ destinations: [destination] });
    const mockUser = { email: "test@gmail.com", firstName: "First Name" };
    await eventFan.identify("userID", mockUser);
    expect(destination.identify).toHaveBeenCalledWith(mockUser);
  });
});

describe("page", () => {
  const mockPage: PageViewProps = {
    path: "/path",
    title: "title",
    url: "https://www.example.com/path",
  };

  it("adds the event to history", async () => {
    const eventFan = new EventFan();
    await eventFan.page(mockPage.title, mockPage);

    // Access the private history property (dynamically to avoid type errors)
    // eslint-disable-next-line @typescript-eslint/dot-notation
    const privateHistory = eventFan["eventHistory"];

    expect(privateHistory[0].page!.name).toBe(mockPage.name);
    expect(privateHistory[0].track!.properties).toBe(mockPage);
    expect(privateHistory[0].track!.options?.originalTimestamp).toBeTruthy();
  });

  it("forwards the call to each destination", async () => {
    const destination = new MockDestination();
    const eventFan = new EventFan({ destinations: [destination] });

    await eventFan.page(mockPage.title, mockPage);
    expect(destination.page).toHaveBeenCalledWith({
      name: mockPage.title,
      properties: mockPage,
      options: undefined,
    });
  });
});

describe("track", () => {
  const mockTrack: TEvent = {
    name: "Test Event",
    properties: {
      iceCream: "vanilla",
    },
  };

  it("adds the event to history", async () => {
    const eventFan = new EventFan();
    await eventFan.track(mockTrack.name, mockTrack.properties);

    // Access the private history property (dynamically to avoid type errors)
    // eslint-disable-next-line @typescript-eslint/dot-notation
    const privateHistory = eventFan["eventHistory"];

    expect(privateHistory[0].track!.name).toBe(mockTrack.name);
    expect(privateHistory[0].track!.properties).toBe(mockTrack.properties);
    expect(privateHistory[0].track!.options?.originalTimestamp).toBeTruthy();
  });

  it("forwards the call to each loaded destination", async () => {
    const destination = new MockDestination();
    const eventFan = new EventFan({ destinations: [destination] });
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
});
