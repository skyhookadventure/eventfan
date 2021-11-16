import EventFan, { FacebookPixel } from "../..";

const eventFan = new EventFan();

eventFan.addDestination(new FacebookPixel({ pixelId: "243635977408985" }));

eventFan.page();
