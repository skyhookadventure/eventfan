import { mockOrderCompleted, mockUser } from "../../../mocks";
import { DestinationName } from "../../DestinationName";
import Sentry from "../Sentry";

it("has the correct destination name", () => {
  const destination = new Sentry({});
  expect(destination.name).toBe(DestinationName.SENTRY);
});

it("starts as not loaded", () => {
  const destination = new Sentry({});
  expect(destination.isLoaded).toBeFalsy();
});

describe("identify", () => {
  it("passes on the traits to the .setUser method", async () => {
    const setUser = jest.fn();
    const addBreadcrumb = jest.fn();
    const sentry = new Sentry({ setUser, addBreadcrumb });

    await sentry.identify(mockUser);

    expect(setUser).toHaveBeenCalled();
    expect(setUser.mock.calls[0]).toMatchSnapshot();
  });
});

describe("track", () => {
  it("creates a breadcrumb matching the snapshot", async () => {
    const setUser = jest.fn();
    const addBreadcrumb = jest.fn();
    const sentry = new Sentry({ setUser, addBreadcrumb });

    await sentry.track({
      name: "Purchase",
      properties: mockOrderCompleted.properties,
    });

    expect(addBreadcrumb).toHaveBeenCalled();
    expect(addBreadcrumb.mock.calls[0]).toMatchSnapshot();
  });
});
