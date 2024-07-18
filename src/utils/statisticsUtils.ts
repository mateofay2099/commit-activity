import { DateActivity, WEEK_DAYS } from "@/types";
import { getDisplayMonth, getDisplayWeekDay } from "./dateUtils";

export const getCommitsPerMonthChartData = (data: DateActivity[]) => {
  const months: string[] = [];
  const values: number[] = [];

  let lastMonth: string | null = null;

  data.forEach(({ date, commits }) => {
    const currentMonth = getDisplayMonth(date);
    if (lastMonth && currentMonth === lastMonth) {
      values[values.length - 1] += commits;
      return;
    }
    months.push(getDisplayMonth(date));
    values.push(commits);
    lastMonth = currentMonth;
  });

  return { months, values };
};

export const getCommitsPerWeekDayChartData = (data: DateActivity[]) => {
  const weekDays = Object.values(WEEK_DAYS);
  const values = Array(weekDays.length).fill(0);

  data.forEach(({ date, commits }) => {
    const day = getDisplayWeekDay(date);
    const dayIndex = weekDays.indexOf(day);
    values[dayIndex] += commits;
  });

  return { weekDays, values };
};
