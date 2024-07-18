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
}

export interface GraphDateActivity extends DateActivity {
  colorIndex: number;
}

export interface CommitActivityByWeekDay {
  [WEEK_DAYS.SUNDAY]: GraphDateActivity[];
  [WEEK_DAYS.MONDAY]: GraphDateActivity[];
  [WEEK_DAYS.TUESDAY]: GraphDateActivity[];
  [WEEK_DAYS.WEDNESDAY]: GraphDateActivity[];
  [WEEK_DAYS.THURSDAY]: GraphDateActivity[];
  [WEEK_DAYS.FRIDAY]: GraphDateActivity[];
  [WEEK_DAYS.SATURDAY]: GraphDateActivity[];
}
