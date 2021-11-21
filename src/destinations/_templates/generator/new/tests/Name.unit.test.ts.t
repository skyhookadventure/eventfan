---
to: <%= h.changeCase.lower(name) %>/tests/<%= h.changeCase.pascal(name) %>.unit.test.ts
---
import { DestinationName } from "../../DestinationName";
import <%= h.changeCase.pascal(name) %> from "../<%= h.changeCase.pascal(name) %>";

it("has the correct destination name", () => {
  const destination = new <%= h.changeCase.pascal(name) %>({});
  expect(destination.name).toBe(DestinationName.<%= h.changeCase.upper(name) %>);
});

it("starts as not loaded", () => {
  const destination = new <%= h.changeCase.pascal(name) %>({});
  expect(destination.isLoaded).toBeFalsy();
});
