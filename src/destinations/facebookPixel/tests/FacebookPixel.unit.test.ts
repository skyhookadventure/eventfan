/* eslint-disable @typescript-eslint/dot-notation */
import { mockOrderCompleted, mockTrack, mockUser } from "../../../mocks";
import { DestinationName } from "../../DestinationName";
import FacebookPixel from "../FacebookPixel";
import { ContentType } from "../types/shared/GenericFacebookEvent";

it("has the correct destination name", () => {
  const fb = new FacebookPixel({ pixelId: "pixelId" });
  expect(fb.name).toBe(DestinationName.FACEBOOK_PIXEL);
});

it("starts as not loaded", () => {
  const fb = new FacebookPixel({ pixelId: "pixelId" });
  expect(fb.isLoaded).toBeFalsy();
});

describe("eventMappings", () => {
  it("binds the config to the event mapping methods", () => {
    const fb = new FacebookPixel({
      pixelId: "pixelId",
      categoryToContent: [{ from: "Trip", to: ContentType.DESTINATION }],
    });

    const res = fb.eventMappings["Order Completed"](mockOrderCompleted);
    expect(res.properties.content_type).toEqual([
      ContentType.PRODUCT,
      ContentType.DESTINATION,
    ]);
  });
});

describe("identify", () => {
  it("formats the advance matching parameters in a way that matches the snapshot", async () => {
    const fb = new FacebookPixel({ pixelId: "pixelId" });
    const mockFbWindowObject = jest.fn() as any;
    fb["fb"] = mockFbWindowObject;

    await fb.identify(mockUser);

    expect(mockFbWindowObject.mock.calls[0]).toMatchSnapshot();
  });
});

describe("page", () => {
  it("calls the correct facebook track method", async () => {
    const fb = new FacebookPixel({ pixelId: "pixelId" });
    const mockFbWindowObject = jest.fn() as any;
    fb["fb"] = mockFbWindowObject;

    await fb.page();

    expect(mockFbWindowObject.mock.calls[0]).toMatchSnapshot();
  });
});

describe("track", () => {
  it("calls the facebook track method with parameters matching the snapshot", async () => {
    const fb = new FacebookPixel({ pixelId: "pixelId" });
    const mockFbWindowObject = jest.fn() as any;
    fb["fb"] = mockFbWindowObject;

    await fb.track({
      name: "Purchase",
      properties: mockOrderCompleted.properties,
    });

    expect(mockFbWindowObject.mock.calls[0]).toMatchSnapshot();
  });

  it("calls the facebook trackCustom method with parameters matching the snapshot", async () => {
    const fb = new FacebookPixel({ pixelId: "pixelId" });
    const mockFbWindowObject = jest.fn() as any;
    fb["fb"] = mockFbWindowObject;

    await fb.track(mockTrack);

    expect(mockFbWindowObject.mock.calls[0]).toMatchSnapshot();
  });
});
