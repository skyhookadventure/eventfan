import { TEvent } from "../../types/TrackEvent";

interface TrialStartedProps {
  /**
   * The context array
   */
  context?: any[];

  /**
   * Date when the trial ends (ISO-8601 date string)
   */
  trial_end_date: string;

  /**
   * Name of the plan being trialed
   */
  trial_plan_name?: string;

  /**
   * Date when the trial starts (ISO-8601 date string)
   */
  trial_start_date: string;
}

/**
 * Trial is started
 */
export type TrialStarted = TEvent<"Trial Started", TrialStartedProps>;
