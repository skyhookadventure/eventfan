import { Container } from "react-bootstrap";
import { useEffect } from "react";
import {
  FacebookPixel,
  GA4,
  Hotjar,
  Posthog,
  EventFanProvider,
  useEventFan,
  Ecommerce,
  Drip,
} from "../../..";

/**
 * Emit a sample page call
 */
function Page() {
  const { page } = useEventFan();

  useEffect(() => {
    page();
  });

  return null;
}

/**
 * Emit a sample identify call
 */
function Identify() {
  const { identify } = useEventFan();

  useEffect(() => {
    identify("userID", {
      firstName: "Fname",
      lastName: "Lname",
      email: "test@example.com",
    });
  });

  return null;
}

/**
 * Emit a sample track call
 */
function Track() {
  const { track } = useEventFan();

  useEffect(() => {
    track<Ecommerce.OrderCompleted>("Order Completed", {
      order_id: "orderID",
      revenue: 100.0,
      products: [
        {
          product_id: "productID",
          quantity: 1,
        },
      ],
      currency: "GBP",
    });
  });

  return null;
}

/**
 * Test React App
 *
 * Should add all destinations, using testing credentials, and run some sample calls.
 */
function App() {
  return (
    <div>
      <EventFanProvider
        destinations={[
          new Drip({ accountId: "7500000" }), // Drip doesn't have a sandbox so use a dummy accountId
          new FacebookPixel({ pixelId: "243635977408985" }),
          new GA4({ measurementId: "GTM-TNBDGJR" }),
          new Hotjar({ siteID: "2705682" }),
          new Posthog({
            teamApiKey: "phc_CrjkOExGDLy4CXCwuht6eEIHDM7VDNsTXAI3tpTATim",
          }),
        ]}
        rudderStack={{
          writeKey: "1uFnpaQiJmOxs4zG2jIon52HIhn",
        }}
      >
        <Container>
          <h1>EventFan React Test</h1>
          <Identify />
          <Page />
          <Track />
        </Container>
      </EventFanProvider>
    </div>
  );
}

export default App;
