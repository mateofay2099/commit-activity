import { getColorIndex, getMonthHeadersFromActivities } from "./graphUtils";

describe("getColorIndex", () => {
  it("should return 0 if there is no commits", () => {
    const response = getColorIndex(0, 84);
    expect(response).toEqual(0);
  });

  it("should change returned number at correct limits", () => {
    let response = getColorIndex(1, 84);
    expect(response).toEqual(1);

    response = getColorIndex(21, 84);
    expect(response).toEqual(1);
    response = getColorIndex(22, 84);
    expect(response).toEqual(2);

    response = getColorIndex(42, 84);
    expect(response).toEqual(2);
    response = getColorIndex(43, 84);
    expect(response).toEqual(3);

    response = getColorIndex(63, 84);
    expect(response).toEqual(3);
    response = getColorIndex(64, 84);
    expect(response).toEqual(4);

    response = getColorIndex(84, 84);
    expect(response).toEqual(4);
  });

  it("should throw an error if commits count is greater than maxCount", () => {
    expect(() => getColorIndex(85, 84)).toThrow(
      "Commits count is greater than maxCount"
    );
  });
});

describe("getMonthHeadersFromActivities", () => {
  it("should return empty array if there are no activities", () => {
    const response = getMonthHeadersFromActivities([]);
    expect(response).toEqual([]);
  });

  it("should return proper colSpan based on number of ocurrences", () => {
    const activities = [
      { date: new Date("2021-01-01"), commits: 1, colorIndex: 1 },
      { date: new Date("2021-01-02"), commits: 1, colorIndex: 1 },
      { date: new Date("2021-02-01"), commits: 1, colorIndex: 1 },
      { date: new Date("2021-02-02"), commits: 1, colorIndex: 1 },
      { date: new Date("2021-02-03"), commits: 1, colorIndex: 1 },
      { date: new Date("2021-03-03"), commits: 1, colorIndex: 1 },
    ];
    const response = getMonthHeadersFromActivities(activities);
    expect(response).toEqual([
      { month: "Jan", year: 2021, colSpan: 2 },
      { month: "Feb", year: 2021, colSpan: 3 },
      { month: "Mar", year: 2021, colSpan: 1 },
    ]);
  });

  it("should return same month with different years as different headers", () => {
    const activities = [
      { date: new Date("2021-01-01"), commits: 1, colorIndex: 1 },
      { date: new Date("2021-01-02"), commits: 1, colorIndex: 1 },
      { date: new Date("2020-01-01"), commits: 1, colorIndex: 1 },
      { date: new Date("2020-01-02"), commits: 1, colorIndex: 1 },
    ];
    const response = getMonthHeadersFromActivities(activities);
    expect(response).toEqual([
      { month: "Jan", year: 2021, colSpan: 2 },
      { month: "Jan", year: 2020, colSpan: 2 },
    ]);
  });
});
