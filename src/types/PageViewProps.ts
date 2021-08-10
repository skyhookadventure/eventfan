/**
 * Page View event properties
 *
 * Based on the Segment/RudderStack defaults at https://segment.com/docs/connections/spec/page/#properties
 */
export interface PageViewProps {
  /**
   * 	A list/array of keywords describing the content of the page. The keywords would most likely be the same as, or
   * 	similar to, the keywords you would find in an html meta tag for SEO purposes. This property is mainly used by
   * 	content publishers that rely heavily on pageview tracking. This is not automatically collected.
   */
  keywords?: string[];
  /**
   * Name of the page. This is reserved for future use.
   */
  name?: string;
  /**
   * Path portion of the URL of the page. Equivalent to canonical path which defaults to location.pathname from the DOM
   * API.
   */
  path: string;
  /**
   * Full URL of the previous page. Equivalent to document.referrer from the DOM API.
   */
  referrer?: string;
  /**
   * Query string portion of the URL of the page. Equivalent to location.search from the DOM API.
   */
  search?: string;
  /**
   * Title of the page. Equivalent to document.title from the DOM API.
   */
  title: string;
  /**
   * Full URL of the page. First we look for the canonical url. If the canonical url is not provided, we use
   * location.href from the DOM API.
   */
  url: string;
}
