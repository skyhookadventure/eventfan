import posthog from "posthog-js";
import { DestinationName } from "../../DestinationName";
import Posthog from "../Posthog";

afterEach(() => {
  jest.clearAllMocks();
});

it("has the correct destination name", () => {
  const destination = new Posthog({ teamApiKey: "123" });
  expect(destination.name).toBe(DestinationName.POSTHOG);
});

it("starts as not loaded", () => {
  const destination = new Posthog({ teamApiKey: "123" });
  expect(destination.isLoaded).toBeFalsy();
});

it("tries to initialise as soon as a class instance is created", () => {
  const spy = jest.spyOn(posthog, "init");
  new Posthog({ teamApiKey: "123" });
  expect(spy).toHaveBeenCalled();
});

describe("When server side rendering", () => {
  // Remove the window object as it won't exist on SSR
  const { window } = global;
  beforeEach(() => {
    delete (global as any).window;
  });
  afterAll(() => {
    global.window = window;
  });

  it("doesn't try to initialise when server side rendering", async () => {
    const spy = jest.spyOn(posthog, "init");
    const destination = new Posthog({ teamApiKey: "123" });
    await destination.initialise();
    expect(spy).not.toHaveBeenCalled();
  });
});
