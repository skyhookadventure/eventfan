import { DestinationName } from "../../DestinationName";
import RudderStack from "../RudderStack";

it("has the correct destination name", () => {
  const destination = new RudderStack({ writeKey: "123" });
  expect(destination.name).toBe(DestinationName.RUDDERSTACK);
});
