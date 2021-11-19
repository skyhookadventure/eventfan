/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/dot-notation */
import { mockTrack, mockUser } from "../../../mocks";
import { DestinationName } from "../../DestinationName";
import Drip from "../Drip";

afterEach(() => {
  window._dcq = [];
});

it("has the correct destination name", () => {
  const destination = new Drip({ accountId: "123" });
  expect(destination.name).toBe(DestinationName.DRIP);
});

it("starts as not loaded", () => {
  const destination = new Drip({ accountId: "123" });
  expect(destination.isLoaded).toBeFalsy();
});

describe("identify", () => {
  it("formats the advance matching parameters in a way that matches the snapshot", async () => {
    const destination = new Drip({ accountId: "123" });
    await destination.identify(mockUser);
    expect(destination["drip"][0]).toMatchInlineSnapshot(`
      Array [
        "identify",
        Object {
          "email": "test@gmail.com",
          "first_name": "FirstName",
          "last_name": "LastName",
          "phone": "+447111111111",
          "user_id": "userID",
        },
      ]
    `);
  });
});

describe("track", () => {
  it("calls the facebook track method with parameters matching the snapshot", async () => {
    const destination = new Drip({ accountId: "123" });
    await destination.track(mockTrack);
    expect(destination["drip"][0]).toMatchInlineSnapshot(`
      Array [
        "track",
        "Test Event",
        Object {
          "iceCream": "vanilla",
          "occurred_at": undefined,
        },
      ]
    `);
  });
});
