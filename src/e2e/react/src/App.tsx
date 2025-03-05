import { addBreadcrumb, captureException, init, setUser } from '@sentry/browser';
import { capitalCase } from 'change-case';
import { Button, Col, Container, Row } from 'react-bootstrap';
import {
  Drip,
  EventFanProvider,
  FacebookPixel,
  GA4,
  Hotjar,
  Posthog,
  Sentry,
  TEvent,
  useEventFan,
} from '../../../index';
import * as ecommerceMockEvents from '../../../mocks/ecommerce';

function CoreEvents() {
  const { identify, page } = useEventFan();

  return (
    <div className='d-grid gap-2'>
      <h2>Core Events</h2>
      <Button
        onClick={() => {
          identify('userID', {
            firstName: 'Fname',
            lastName: 'Lname',
            email: 'test@example.com',
          });

          // Capture a sentry exception as only then will breadcrumbs be sent
          captureException('identify');
        }}>
        Identify
      </Button>
      <Button onClick={() => page()}>Page</Button>
    </div>
  );
}

function EcommerceEvents() {
  const { track } = useEventFan();

  const mockEventNames = Object.keys(ecommerceMockEvents);

  return (
    <div className='d-grid gap-2'>
      <h2>Ecommerce Events</h2>
      {mockEventNames.map((name) => {
        const eventName = capitalCase(name.replace('mock', ''));
        const mock = (ecommerceMockEvents as any)[name] as TEvent;

        function onClick(): void {
          track(mock.name, mock.properties);
          // Capture a sentry exception as only then will breadcrumbs be sent
          captureException('event');
        }

        return (
          <Button key={name} onClick={onClick}>
            {eventName}
          </Button>
        );
      })}
    </div>
  );
}

init({
  dsn: 'https://f85d892a283445cd9ab271e829356553@o925922.ingest.sentry.io/6414036',
});

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
          new Drip({ accountId: '7546327' }), // Drip doesn't have a sandbox so use a dummy accountId
          new FacebookPixel({ pixelId: '243635977408985' }),
          new GA4({ measurementId: 'G-0PST7G69H1' }),
          new Hotjar({ siteID: '2705682' }),
          new Posthog({
            teamApiKey: 'phc_CrjkOExGDLy4CXCwuht6eEIHDM7VDNsTXAI3tpTATim',
          }),
          new Sentry({ setUser, addBreadcrumb }),
        ]}>
        <Container>
          <h1>EventFan React Test</h1>
          <Row>
            <Col>
              <CoreEvents />
            </Col>
            <Col>
              <EcommerceEvents />
            </Col>
          </Row>
        </Container>
      </EventFanProvider>
    </div>
  );
}

export default App;
