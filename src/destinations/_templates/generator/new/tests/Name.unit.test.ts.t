---
to: <%= h.changeCase.lower(name) %>/tests/<%= h.changeCase.title(name) %>.unit.test.ts
---
import { DestinationName } from "../../DestinationName";
import <%= h.changeCase.title(name) %> from "../<%= h.changeCase.title(name) %>";

it("has the correct destination name", () => {
  const destination = new <%= h.changeCase.title(name) %>({});
  expect(destination.name).toBe(DestinationName.<%= h.changeCase.upper(name) %>);
});

it("starts as not loaded", () => {
  const destination = new <%= h.changeCase.title(name) %>({});
  expect(destination.isLoaded).toBeFalsy();
});
