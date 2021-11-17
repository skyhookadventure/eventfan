import { DestinationName } from "../../DestinationName";
import Posthog from "../Posthog";

it("has the correct destination name", () => {
  const destination = new Posthog({ teamApiKey: "123" });
  expect(destination.name).toBe(DestinationName.POSTHOG);
});

it("starts as not loaded", () => {
  const destination = new Posthog({ teamApiKey: "123" });
  expect(destination.isLoaded).toBeFalsy();
});
