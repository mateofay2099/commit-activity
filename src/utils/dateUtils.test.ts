import { WEEK_DAYS } from "@/types";
import {
  getDisplayDate,
  getDisplayDateNumber,
  getDisplayMonth,
  getDisplayWeekDay,
  isFutureDate,
  isThisYear,
} from "./dateUtils";

describe("isThisYear", () => {
  it("should return true if it is the same year", () => {
    const response = isThisYear(new Date());
    expect(response).toEqual(true);
  });

  it("should return false if it is not the same year", () => {
    const response = isThisYear(new Date("2020-01-01"));
    expect(response).toEqual(false);
  });
});

describe("isFutureDate", () => {
  it("should return true if it is a future date", () => {
    const tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    const response = isFutureDate(tomorrowDate);
    expect(response).toEqual(true);
  });

  it("should return false if it is today", () => {
    const response = isFutureDate(new Date());
    expect(response).toEqual(false);
  });

  it("should return false if it is a past date", () => {
    const response = isFutureDate(new Date("2020-01-01"));
    expect(response).toEqual(false);
  });
});

describe("getDisplayMonth", () => {
  it("should return string with just the short month name", () => {
    let response = getDisplayMonth(new Date("2021-01-01"));
    expect(response).toEqual("Jan");

    response = getDisplayMonth(new Date("2021-05-01"));
    expect(response).toEqual("May");
  });
});

describe("getDisplayWeekDay", () => {
  it("should return strings with the weekday short names", () => {
    let response = getDisplayWeekDay(new Date("2024-07-14"));
    expect(response).toEqual(WEEK_DAYS.SUNDAY);

    response = getDisplayWeekDay(new Date("2024-07-15"));
    expect(response).toEqual(WEEK_DAYS.MONDAY);

    response = getDisplayWeekDay(new Date("2024-07-16"));
    expect(response).toEqual(WEEK_DAYS.TUESDAY);

    response = getDisplayWeekDay(new Date("2024-07-17"));
    expect(response).toEqual(WEEK_DAYS.WEDNESDAY);

    response = getDisplayWeekDay(new Date("2024-07-18"));
    expect(response).toEqual(WEEK_DAYS.THURSDAY);

    response = getDisplayWeekDay(new Date("2024-07-19"));
    expect(response).toEqual(WEEK_DAYS.FRIDAY);

    response = getDisplayWeekDay(new Date("2024-07-20"));
    expect(response).toEqual(WEEK_DAYS.SATURDAY);
  });
});

describe("getDisplayDateNumber", () => {
  it("should return string with 0 prefix if it is less than 10", () => {
    const response = getDisplayDateNumber(9);
    expect(response).toEqual("09");
  });

  it("should return same number as string if it is equal to 10", () => {
    const response = getDisplayDateNumber(10);
    expect(response).toEqual("10");
  });

  it("should return same number as string if it is greater than 10", () => {
    const response = getDisplayDateNumber(11);
    expect(response).toEqual("11");
  });
});

describe("getDisplayDate", () => {
  it("should return display date with just day and month if it is this year", () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const firstDayOfCurrentYear = new Date(currentYear, 0, 1);

    const response = getDisplayDate(firstDayOfCurrentYear);
    expect(response).toEqual("01 Jan");
  });

  it("should return display date with day, month and year if it is not this year", () => {
    const response = getDisplayDate(new Date("2020-03-05"));
    expect(response).toEqual("05 Mar, 2020");
  });
});
