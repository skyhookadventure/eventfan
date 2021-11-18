import { Container } from "react-bootstrap";
import { useEffect } from "react";
import { EventFanProvider, useEventFan } from "../../../react/index";
import { FacebookPixel } from "../../..";

function Page() {
  const { page } = useEventFan();

  useEffect(() => {
    page();
  });

  return null;
}

function App() {
  return (
    <div>
      <EventFanProvider
        config={{
          destinations: [new FacebookPixel({ pixelId: "243635977408985" })],
        }}
      >
        <Container>
          <h1>EventFan React Test</h1>
          <Page />
        </Container>
      </EventFanProvider>
    </div>
  );
}

export default App;
