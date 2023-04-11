import RudderStack, { RudderStackConfig } from "../RudderStack";
import "cross-fetch/polyfill";
import { mockOrderCompleted, mockPage, mockUser } from "../../../mocks";

const stagingConfig: RudderStackConfig = {
  writeKey: "1uFnpaQiJmOxs4zG2jIon52HIhn",
};

// Allow for long RudderStack timeout as their servers can be very slow
jest.setTimeout(60000);

describe("callRudderStackAPI", () => {
  it("fails gracefully with an error", async () => {
    const destination = new RudderStack({
      ...stagingConfig,
      writeKey: "incorrect",
    });
    const res = await destination.identify({} as any);
    expect(res.status).toBe(404);
  });
});

describe("identify", () => {
  it("works without any traits", async () => {
    const destination = new RudderStack(stagingConfig);

    const res = await destination.identify({
      userId: "userID",
      traits: undefined as any,
    });

    expect(res.status).toBe(200);
  });

  it("works with a mock user", async () => {
    const destination = new RudderStack(stagingConfig);
    const res = await destination.identify(mockUser);
    expect(res.status).toBe(200);
  });
});

describe("page", () => {
  it("works with a mock page", async () => {
    const destination = new RudderStack(stagingConfig);
    const res = await destination.page(mockPage);
    expect(res.status).toBe(200);
  });
});

describe("track", () => {
  it("works without any properties", async () => {
    const destination = new RudderStack(stagingConfig);
    const res = await destination.track({
      name: "track",
      properties: undefined as any,
    });
    expect(res.status).toBe(200);
  });

  it("works with a mock event", async () => {
    const destination = new RudderStack(stagingConfig);
    const res = await destination.track({
      name: "track",
      properties: mockOrderCompleted,
    });
    expect(res.status).toBe(200);
  });
});
