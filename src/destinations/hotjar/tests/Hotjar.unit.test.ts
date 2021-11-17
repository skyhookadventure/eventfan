import { DestinationName } from "../../DestinationName";
import Hotjar from "../Hotjar";

it("has the correct destination name", () => {
  const hotjar = new Hotjar({ siteID: "123" });
  expect(hotjar.name).toBe(DestinationName.HOTJAR);
});

it("starts as not loaded", () => {
  const hotjar = new Hotjar({ siteID: "123" });
  expect(hotjar.isLoaded).toBeFalsy();
});
