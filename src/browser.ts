import EventFan from "./client/EventFan";

export default EventFan;

/**
 * Export a global variable EventFan
 *
 * For use when loaded directly in `<script>` tags.
 */
(window as any).EventFan = EventFan;
