import { DateActivity } from "./types";

const NON_EMPTY_COLORS_COUNT = 4;
export const getColorIndex = (commits: number, maxCount: number) => {
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

const isThisYear = (date: Date) => {
  const today = new Date();
  return date.getFullYear() === today.getFullYear();
};
export const isFutureDate = (date: Date) => {
  const today = new Date();
  return date > today;
};

const getDisplayDateNumber = (num: number) => (num < 10 ? `0${num}` : `${num}`);

const getDisplayMonth = (date: Date) => {
  return date.toLocaleString("en", {
    month: "short",
  });
};

export const getDisplayDate = (date: Date) => {
  const displayDate = `${getDisplayDateNumber(
    date.getDate()
  )} ${getDisplayMonth(date)}`;

  if (isThisYear(date)) {
    return displayDate;
  }

  return `${displayDate}, ${date.getFullYear()}`;
};
