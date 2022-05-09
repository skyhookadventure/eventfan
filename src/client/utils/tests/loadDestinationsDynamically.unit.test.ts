/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import EventFan from "../../..";
import { DestinationName } from "../../../destinations/DestinationName";
import loadDestinationsDynamically, {
  dynamicImportDestination,
} from "../loadDestinationsDynamically";

afterEach(() => {
  jest.clearAllMocks();
});

describe("dynamicImportDestination", () => {
  // Mock out eventFan addDestination
  const eventFan = new EventFan();
  eventFan.addDestination = jest.fn();

  // Get destination names
  const destinationNames = Object.keys(DestinationName);

  // Test each destination loads (note we can't use test.forEach as these are async)
  for (const name of destinationNames) {
    it(`loads ${name} without errors`, async () => {
      await dynamicImportDestination.call(eventFan, {
        destinationDefinition: { name: name as DestinationName },
        config: {},
      });

      expect(eventFan.addDestination).toHaveBeenCalledTimes(1);
    });
  }

  it("logs an error for an unsupported destinations", async () => {
    const mockConsole = jest.fn();
    jest.spyOn(console, "warn").mockImplementation(mockConsole);

    await dynamicImportDestination.call(eventFan, {
      destinationDefinition: { name: "UNKNOWN" as DestinationName },
      config: {},
    });

    expect(eventFan.addDestination).not.toHaveBeenCalled();
    expect(mockConsole).toHaveBeenCalledTimes(1);
  });

  it("logs an error when failing to load a destination dynamically", async () => {
    const mockConsole = jest.fn();
    jest.spyOn(console, "warn").mockImplementation(mockConsole);

    eventFan.addDestination = jest.fn(() => {
      throw new Error("Err message");
    });

    await dynamicImportDestination.call(eventFan, {
      destinationDefinition: { name: DestinationName.DRIP },
      config: {},
    });

    expect(mockConsole).toHaveBeenCalledTimes(1);
  });
});

describe("loadDestinationsDynamically", () => {
  it("filters out disabled destinations", async () => {
    const eventFan = new EventFan();
    eventFan.addDestination = jest.fn();

    await loadDestinationsDynamically.call(eventFan, [
      {
        enabled: false,
        destinationDefinition: { name: DestinationName.DRIP } as any,
        config: {},
      },
    ]);

    expect(eventFan.addDestination).not.toHaveBeenCalled();
  });

  it("loads enabled destinations", async () => {
    const eventFan = new EventFan();
    eventFan.addDestination = jest.fn();

    await loadDestinationsDynamically.call(eventFan, [
      {
        enabled: true,
        destinationDefinition: { name: DestinationName.DRIP } as any,
        config: {},
      },
    ]);

    expect(eventFan.addDestination).toHaveBeenCalled();
  });
});
