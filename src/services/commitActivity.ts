import { CommitActivity, WEEK_DAYS } from "@/types";
import { isFutureDate, getColorIndex } from "@utils";
import { makeRequest } from "@services/makeRequest";

export type GithubCommitActivityResponse = {
  total: number;
  week: number;
  days: number[];
}[];

export const mapGithubResponse = (data: GithubCommitActivityResponse) => {
  const commitActivity: CommitActivity = {
    [WEEK_DAYS.SUNDAY]: [],
    [WEEK_DAYS.MONDAY]: [],
    [WEEK_DAYS.TUESDAY]: [],
    [WEEK_DAYS.WEDNESDAY]: [],
    [WEEK_DAYS.THURSDAY]: [],
    [WEEK_DAYS.FRIDAY]: [],
    [WEEK_DAYS.SATURDAY]: [],
  };

  const maxCommitCount = Math.max(
    ...data.map((activity) => Math.max(...activity.days))
  );

  data.forEach((activity) => {
    activity.days.forEach((commits, dayIndex) => {
      const weekDay = Object.values(WEEK_DAYS)[dayIndex];
      if (!weekDay || !commitActivity[weekDay]) return;

      const dayDate = new Date(activity.week * 1000);
      dayDate.setDate(dayDate.getDate() + dayIndex);

      if (isFutureDate(dayDate)) return;

      commitActivity[weekDay].push({
        date: dayDate,
        commits,
        colorIndex: getColorIndex(commits, maxCommitCount),
      });
    });
  });
  return commitActivity;
};

export const getCommitActivity = async () => {
  const ENDPOINT_URL = process.env.ENDPOINT_URL;
  if (!ENDPOINT_URL) {
    const errMessage = "No endpoint URL provided";
    console.error(errMessage);
    return {
      data: null,
      error: errMessage,
    };
  }

  const response = await makeRequest<GithubCommitActivityResponse>(
    ENDPOINT_URL
  );
  return {
    data: response.data ? mapGithubResponse(response.data) : response.data,
    error: response.error,
  };
};
