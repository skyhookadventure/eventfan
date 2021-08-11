/* eslint-disable max-classes-per-file */
import EventFan from "../EventFan";
import Destination from "../../destinations/Destination";
import { DestinationName } from "../../destinations/DestinationName";

/**
 * Mock Destination
 *
 * This is used for the tests below, to spy on method calls etc.
 */
class MockDestination implements Destination {
  eventMappings = {};

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
  it("forwards the identify call to each destination", async () => {
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
    const mockUser = { email: "test@gmail.com", firstName: "First Name" };
    await eventFan.identify(mockUser);
    expect(destination.identify).toHaveBeenCalledWith(mockUser);
  });
});
