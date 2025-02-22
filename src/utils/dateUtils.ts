import { WEEK_DAYS } from "@/types";

export const isThisYear = (date: Date) => {
  const today = new Date();
  return date.getFullYear() === today.getFullYear();
};
export const isFutureDate = (date: Date) => {
  const today = new Date();
  return date > today;
};

export const getDisplayMonth = (date: Date) => {
  return date.toLocaleString("en", {
    month: "short",
  });
};

export const getDisplayWeekDay = (date: Date) => {
  return date.toLocaleString("en", { weekday: "short" }) as WEEK_DAYS;
};

export const getDisplayDateNumber = (num: number) =>
  num < 10 ? `0${num}` : `${num}`;

export const getDisplayDate = (date: Date) => {
  const displayDate = `${getDisplayDateNumber(
    date.getDate()
  )} ${getDisplayMonth(date)}`;

  if (isThisYear(date)) {
    return displayDate;
  }

  return `${displayDate}, ${date.getFullYear()}`;
};
