/**
 * Travel Destination specific parameters
 *
 * https://developers.facebook.com/docs/marketing-api/destination-ads/events#parameter-details
 */
export interface Destination {
  /**
   * The start date of user's trip. We accept dates in YYYYMMDD, YYYY-MM-DD,
   * YYYY-MM-DDThh:mmTZD and YYYY-MM-DDThh:mm:ssTZD. When provided, you can use
   * this in the ad using template tags and target people based on their travel
   * dates using booking window in your audiences.
   *
   * @example
   * 20180623
   * 2018-06-23
   * 2017-06-23T15:30GMT
   * 2017-06-23T15:30:00GMT
   */
  travel_start?: string;

  /**
   * The end date of user's trip. We accept the same date formats as listed for
   * travel_start. When provided, you can use this in the ad using template tags
   * and target people based on their travel dates using booking window in your
   * audiences.
   */
  travel_end?: string;

  /**
   * Provide the city of the location from user intent.
   */
  city?: string;

  /**
   * Provide the region of the location from user intent.
   */
  region?: string;

  /**
   * Provide the country of the location from user intent.
   */
  country?: string;

  /**
   * Number of adults that will be traveling. When provided, you can use this in
   * the ad using template tags.
   *
   * @example
   * 2
   */
  num_adults?: number;

  /**
   * Number of children that will be traveling. When provided, you can use this
   * in the ad using template tags.
   *
   * @example
   * 2
   */
  num_children?: number;

  /**
   * A list of IDs representing destination suggestions for this user. This
   * parameter is not applicable for the Search event.
   *
   * @example
   * '["1234", "2345", "3456"]'
   */
  suggested_destinations?: string[];
}
