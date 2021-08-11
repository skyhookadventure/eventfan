/* eslint-disable max-classes-per-file */
import EventFan from "../EventFan";
import Destination from "../../destinations/Destination";
import { DestinationName } from "../../destinations/DestinationName";
import { PageViewProps } from "../../types/PageViewProps";
import { IdentifyProps } from "../../types/IdentifyProps";
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
      return { eventName: "ModifiedEventName", props: { modified: true } };
    },
  };

  identify = jest.fn();

  initialise = jest.fn();

  isLoaded = true;

  name = "MOCK_DESTINATION" as DestinationName;

  page = jest.fn();

  track = jest.fn();
}

it("initialises without errors", () => {
  new EventFan({ destinations: [] });
});

describe("identify", () => {
  it("forwards the call to each destination", async () => {
    const destination = new MockDestination();
    const eventFan = new EventFan({ destinations: [destination] });
    const mockUser = { email: "test@gmail.com", firstName: "First Name" };
    await eventFan.identify(mockUser);
    expect(destination.identify).toHaveBeenCalledWith(mockUser);
  });

  it("waits until the destination is loaded before calling it", async () => {
    class MockDestinationDelayLoading extends MockDestination {
      isLoaded = false;

      constructor() {
        super();
        // Set isLoaded after a short delay
        setTimeout(() => {
          this.isLoaded = true;
        }, 190);
      }
    }

    const destination = new MockDestinationDelayLoading();
    const eventFan = new EventFan({ destinations: [destination] });
    const mockUser: IdentifyProps = {
      email: "test@gmail.com",
      firstName: "First Name",
    };
    await eventFan.identify(mockUser);
    expect(destination.identify).toHaveBeenCalledWith(mockUser);
  });
});

describe("page", () => {
  it("forwards the call to each destination", async () => {
    const destination = new MockDestination();
    const eventFan = new EventFan({ destinations: [destination] });
    const mockPage: PageViewProps = {
      path: "/path",
      title: "title",
      url: "https://www.example.com/path",
    };
    await eventFan.page(mockPage);
    expect(destination.page).toHaveBeenCalledWith(mockPage);
  });
});

describe("track", () => {
  it("forwards the call to each destination", async () => {
    const destination = new MockDestination();
    const eventFan = new EventFan({ destinations: [destination] });
    const mockTrack: TEvent = {
      eventName: "Test Event",
      props: {
        iceCream: "vanilla",
      },
    };
    await eventFan.track(mockTrack);
    expect(destination.track).toHaveBeenCalledWith(mockTrack);
  });

  it("applies event mappings if they exist on each destination", async () => {
    const destination = new MockDestination();
    const eventFan = new EventFan({ destinations: [destination] });
    const mockTrack: TEvent = {
      eventName: "Order Completed",
      props: {
        iceCream: "vanilla",
      },
    };
    await eventFan.track(mockTrack);
    expect(destination.track).toHaveBeenCalledWith({
      eventName: "ModifiedEventName",
      props: {
        modified: true,
      },
    });
  });
});
