import { CommitActivityByWeekDay, DateActivity, WEEK_DAYS } from "@/types";
import { getDisplayMonth, getDisplayWeekDay } from "./dateUtils";

const NON_EMPTY_COLORS_COUNT = 4;
export const getColorIndex = (commits: number, maxCount: number) => {
  if (commits > maxCount) {
    throw new Error("Commits count is greater than maxCount");
  }
  if (commits === 0) return 0;

  const countPerColor = maxCount / NON_EMPTY_COLORS_COUNT;
  const colorIndex = Math.ceil(commits / countPerColor);

  return colorIndex;
};

export const getCommitActivityByWeekDay = (activities: DateActivity[]) => {
  const maxCommitCount = Math.max(
    ...activities.map((activity) => activity.commits)
  );

  const commitActivityByDay: CommitActivityByWeekDay = {
    [WEEK_DAYS.SUNDAY]: [],
    [WEEK_DAYS.MONDAY]: [],
    [WEEK_DAYS.TUESDAY]: [],
    [WEEK_DAYS.WEDNESDAY]: [],
    [WEEK_DAYS.THURSDAY]: [],
    [WEEK_DAYS.FRIDAY]: [],
    [WEEK_DAYS.SATURDAY]: [],
  };

  activities.forEach((activity) => {
    const day = getDisplayWeekDay(activity.date);
    commitActivityByDay[day].push({
      ...activity,
      colorIndex: getColorIndex(activity.commits, maxCommitCount),
    });
  });

  return commitActivityByDay;
};

type GraphHeaderData = {
  month: string;
  year: number;
  colSpan: number;
};

export const getActivityGraphHeaders = (
  firstWeekDayActivities: DateActivity[]
) => {
  const monthHeaders: GraphHeaderData[] = [];

  firstWeekDayActivities.forEach(({ date }) => {
    const currentDisplayMonth = getDisplayMonth(date);
    const foundHeader = monthHeaders.find(
      (header) =>
        header.month === currentDisplayMonth &&
        header.year === date.getFullYear()
    );
    if (foundHeader) {
      foundHeader.colSpan += 1;
      return;
    }
    monthHeaders.push({
      month: currentDisplayMonth,
      year: date.getFullYear(),
      colSpan: 1,
    });
  });

  return monthHeaders;
};
