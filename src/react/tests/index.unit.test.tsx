import React, { useEffect } from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { EventFanProvider, useEventFan } from "..";

it("adds eventFan to context", async () => {
  function CheckEventFanLoaded() {
    const { page } = useEventFan();
    const pageFunctionExists = !!page;

    useEffect(() => {
      page();
    });

    return <p>{pageFunctionExists && "EXISTS"}</p>;
  }

  render(
    <EventFanProvider>
      <CheckEventFanLoaded />
    </EventFanProvider>
  );

  await screen.findByText("EXISTS");
});
