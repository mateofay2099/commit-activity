export enum WEEK_DAYS {
  SUNDAY = "Sun",
  MONDAY = "Mon",
  TUESDAY = "Tue",
  WEDNESDAY = "Wed",
  THURSDAY = "Thu",
  FRIDAY = "Fri",
  SATURDAY = "Sat",
}

export interface DateActivity {
  date: Date;
  commits: number;
  colorIndex: number;
}

export interface CommitActivity {
  [WEEK_DAYS.SUNDAY]: DateActivity[];
  [WEEK_DAYS.MONDAY]: DateActivity[];
  [WEEK_DAYS.TUESDAY]: DateActivity[];
  [WEEK_DAYS.WEDNESDAY]: DateActivity[];
  [WEEK_DAYS.THURSDAY]: DateActivity[];
  [WEEK_DAYS.FRIDAY]: DateActivity[];
  [WEEK_DAYS.SATURDAY]: DateActivity[];
}
