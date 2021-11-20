/* eslint-disable react-hooks/exhaustive-deps */
import { Container } from "react-bootstrap";
import { useEffect, ReactNode } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
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
 * Emit a sample identify call
 */
function Identify() {
  const eventFan = useEventFan();

  useEffect(() => {
    // identify("userID", {
    //   firstName: "Fname",
    //   lastName: "Lname",
    //   email: "test@example.com",
    // });
    const { page } = eventFan;
    page();
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

function HomePage() {
  const { page } = useEventFan();

  useEffect(() => {
    document.title = "Home";
    page();
  }, []);

  return (
    <>
      <h1>Home Page</h1>
      <Track />
    </>
  );
}

function AboutPage() {
  const { page } = useEventFan();

  useEffect(() => {
    document.title = "About";
    page();
  }, []);

  return <h1>About Page</h1>;
}

export function Pages() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
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
          {/* <Pages /> */}
        </Container>
      </EventFanProvider>
    </div>
  );
}

export default App;
