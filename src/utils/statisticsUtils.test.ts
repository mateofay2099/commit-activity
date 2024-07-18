import { WEEK_DAYS } from "@/types";
import {
  getCommitsPerMonthChartData,
  getCommitsPerWeekDayChartData,
} from "./statisticsUtils";

const weekDays = [
  WEEK_DAYS.SUNDAY,
  WEEK_DAYS.MONDAY,
  WEEK_DAYS.TUESDAY,
  WEEK_DAYS.WEDNESDAY,
  WEEK_DAYS.THURSDAY,
  WEEK_DAYS.FRIDAY,
  WEEK_DAYS.SATURDAY,
];

describe("getCommitsPerMonthChartData", () => {
  it("should return empty arrays if data is empty", () => {
    const result = getCommitsPerMonthChartData([]);
    expect(result).toEqual({ months: [], values: [] });
  });

  it("should return correct months and values", () => {
    const data = [
      { date: new Date("2021-01-15"), commits: 3 },
      { date: new Date("2021-03-15"), commits: 23 },
    ];
    const result = getCommitsPerMonthChartData(data);
    expect(result).toEqual({ months: ["Jan", "Mar"], values: [3, 23] });
  });

  it("should sum commits for the same month", () => {
    const data = [
      { date: new Date("2021-01-15"), commits: 3 },
      { date: new Date("2021-01-20"), commits: 23 },
      { date: new Date("2021-02-15"), commits: 0 },
      { date: new Date("2021-05-20"), commits: 23 },
      { date: new Date("2021-05-20"), commits: 5 },
    ];
    const result = getCommitsPerMonthChartData(data);
    expect(result).toEqual({
      months: ["Jan", "Feb", "May"],
      values: [26, 0, 28],
    });
  });
});

describe("getCommitsPerWeekDayChartData", () => {
  it("should return all week days as 0 if data is empty", () => {
    const result = getCommitsPerWeekDayChartData([]);
    expect(result).toEqual({
      weekDays,
      values: [0, 0, 0, 0, 0, 0, 0],
    });
  });

  it("should return all week days and values even if there is only data for some of them", () => {
    const data = [
      { date: new Date("2024-07-19"), commits: 23 }, // friday
      { date: new Date("2024-07-16"), commits: 3 },
    ];
    const result = getCommitsPerWeekDayChartData(data);
    expect(result).toEqual({ weekDays, values: [0, 0, 3, 0, 0, 23, 0] });
  });

  it("should sum commits for the same week day", () => {
    const data = [
      { date: new Date("2024-07-14"), commits: 3 }, // sunday
      { date: new Date("2024-07-15"), commits: 0 },
      { date: new Date("2024-07-16"), commits: 7 },
      { date: new Date("2024-07-17"), commits: 9 },
      { date: new Date("2024-07-18"), commits: 0 },
      { date: new Date("2024-07-19"), commits: 8 },
      { date: new Date("2024-07-20"), commits: 21 },
      { date: new Date("2024-07-21"), commits: 12 },
      { date: new Date("2024-07-22"), commits: 4 },
      { date: new Date("2024-07-23"), commits: 2 },
      { date: new Date("2024-07-24"), commits: 1 },
    ];
    const result = getCommitsPerWeekDayChartData(data);
    expect(result).toEqual({ weekDays, values: [15, 4, 9, 10, 0, 8, 21] });
  });
});
