import { DestinationName } from "../../DestinationName";
import GA4 from "../GA4";

it("has the correct destination name", () => {
  const ga4 = new GA4({ measurementId: "123" });
  expect(ga4.name).toBe(DestinationName.GA4);
});

it("starts as not loaded", () => {
  const ga4 = new GA4({ measurementId: "123" });
  expect(ga4.isLoaded).toBeFalsy();
});
