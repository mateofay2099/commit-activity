import { DateActivity } from "@/types";
import { getDisplayMonth } from "./dateUtils";

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

type MonthHeaderData = {
  month: string;
  year: number;
  colSpan: number;
};

export const getMonthHeadersFromActivities = (activities: DateActivity[]) => {
  const monthHeaders: MonthHeaderData[] = [];

  activities.forEach(({ date }) => {
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
