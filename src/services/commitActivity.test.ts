import {
  mockedGithubResponse,
  mockedDateActivities,
} from "@/mocks/servicesMocks";
import { getCommitActivity, mapGithubResponse } from "./commitActivity";
import { isFutureDate } from "@utils";
import { makeRequest } from "./makeRequest";

jest.mock("@utils", () => ({
  isFutureDate: jest.fn().mockReturnValue(false),
}));
const mockedIsFutureDate = isFutureDate as jest.Mock;

const consoleErrorSpy = jest.spyOn(console, "error");

jest.mock("@services/makeRequest", () => ({
  makeRequest: jest.fn().mockImplementation(() => ({
    data: mockedGithubResponse,
    error: false,
  })),
}));
const mockedMakeRequest = makeRequest as jest.Mock;

describe("getCommitActivity", () => {
  const env = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...env };
  });

  afterEach(() => {
    process.env = env;
  });

  it("should return parsed commit activity with no error", async () => {
    const response = await getCommitActivity();
    expect(response).toEqual({
      error: false,
      data: mockedDateActivities,
    });
  });

  it("should return error if no endpoint URL is provided", async () => {
    process.env.ENDPOINT_URL = undefined;
    const response = await getCommitActivity();
    const errMessage = "No endpoint URL provided";
    expect(consoleErrorSpy).toHaveBeenCalledWith(errMessage);
    expect(response).toEqual({
      error: errMessage,
      data: null,
    });
  });

  it("should return error if request fails", async () => {
    mockedMakeRequest.mockImplementation(() => ({
      data: null,
      error: true,
    }));

    const response = await getCommitActivity();
    expect(response).toEqual({
      error: true,
      data: null,
    });
  });
});

describe("mapGithubResponse", () => {
  it("should return empty array if no data is provided", () => {
    const response = mapGithubResponse([]);
    expect(response).toEqual([]);
  });

  it("should return an array of commit activity", () => {
    const response = mapGithubResponse(mockedGithubResponse);
    expect(response).toEqual(mockedDateActivities);
  });

  it("should not include future dates", () => {
    mockedIsFutureDate.mockReturnValue(true);
    const response = mapGithubResponse(mockedGithubResponse);
    expect(response).toEqual([]);
  });
});
