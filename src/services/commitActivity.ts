import { DateActivity } from "@/types";
import { isFutureDate, getColorIndex } from "@utils";
import { makeRequest } from "@services/makeRequest";

export type GithubCommitActivityResponse = {
  total: number;
  week: number;
  days: number[];
}[];

export const mapGithubResponse = (data: GithubCommitActivityResponse) => {
  const commitActivity: DateActivity[] = [];

  data.forEach((activity) => {
    activity.days.forEach((commits, dayIndex) => {
      const dayDate = new Date(activity.week * 1000);
      dayDate.setDate(dayDate.getDate() + dayIndex);

      if (isFutureDate(dayDate)) return;

      commitActivity.push({
        date: dayDate,
        commits,
      });
    });
  });
  return commitActivity.sort((a, b) => a.date.getTime() - b.date.getTime());
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
