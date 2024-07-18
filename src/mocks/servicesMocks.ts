import { WEEK_DAYS } from "@/types";

export const mockedGithubResponse = [
  {
    total: 10,
    week: 1690070400,
    days: [0, 1, 2, 3, 4, 5, 6],
  },
];

export const mockedParsedResponse = {
  [WEEK_DAYS.SUNDAY]: [
    {
      date: new Date("2023-07-23T00:00:00.000Z"),
      commits: 0,
      colorIndex: 0,
    },
  ],
  [WEEK_DAYS.MONDAY]: [
    {
      date: new Date("2023-07-24T00:00:00.000Z"),
      commits: 1,
      colorIndex: 0,
    },
  ],
  [WEEK_DAYS.TUESDAY]: [
    {
      date: new Date("2023-07-25T00:00:00.000Z"),
      commits: 2,
      colorIndex: 0,
    },
  ],
  [WEEK_DAYS.WEDNESDAY]: [
    {
      date: new Date("2023-07-26T00:00:00.000Z"),
      commits: 3,
      colorIndex: 0,
    },
  ],
  [WEEK_DAYS.THURSDAY]: [
    {
      date: new Date("2023-07-27T00:00:00.000Z"),
      commits: 4,
      colorIndex: 0,
    },
  ],
  [WEEK_DAYS.FRIDAY]: [
    {
      date: new Date("2023-07-28T00:00:00.000Z"),
      commits: 5,
      colorIndex: 0,
    },
  ],
  [WEEK_DAYS.SATURDAY]: [
    {
      date: new Date("2023-07-29T00:00:00.000Z"),
      commits: 6,
      colorIndex: 0,
    },
  ],
};

export const emptyParsedResponse = {
  [WEEK_DAYS.SUNDAY]: [],
  [WEEK_DAYS.MONDAY]: [],
  [WEEK_DAYS.TUESDAY]: [],
  [WEEK_DAYS.WEDNESDAY]: [],
  [WEEK_DAYS.THURSDAY]: [],
  [WEEK_DAYS.FRIDAY]: [],
  [WEEK_DAYS.SATURDAY]: [],
};
