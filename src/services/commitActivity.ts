import { CommitActivity, WEEK_DAYS } from "@/types";
import { getColorIndex } from "@/utils";
import { makeRequest } from "@services/makeRequest";

const ENDPOINT_URL =
  "https://api.github.com/repos/facebook/react/stats/commit_activity";

export type GithubCommitActivityResponse = {
  total: number;
  week: number;
  days: number[];
}[];

const mapGithubResponse = (data: GithubCommitActivityResponse) => {
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
      const weekDayIndex = dayIndex as WEEK_DAYS;
      if (!commitActivity[weekDayIndex]) return;

      const dayDate = new Date(activity.week * 1000);
      dayDate.setDate(dayDate.getDate() + dayIndex);
      commitActivity[weekDayIndex].push({
        date: new Date(activity.week * 1000),
        commits,
        colorIndex: getColorIndex(commits, maxCommitCount),
      });
    });
  });
  return commitActivity;
};

export const getCommitActivity = async () => {
  const response = await makeRequest<GithubCommitActivityResponse>(
    ENDPOINT_URL
  );
  return {
    data: response.data ? mapGithubResponse(response.data) : response.data,
    error: response.error,
  };
};
