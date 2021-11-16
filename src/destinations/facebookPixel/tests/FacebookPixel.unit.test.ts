/* eslint-disable @typescript-eslint/dot-notation */
import { mockTrack, mockUser } from "../../..";
import FacebookPixel from "../FacebookPixel";

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

    await fb.track(mockTrack);

    expect(mockFbWindowObject.mock.calls[0]).toMatchSnapshot();
  });
});
