import {
  emptyParsedResponse,
  mockedGithubResponse,
  mockedParsedResponse,
} from "@/mocks/servicesMocks";
import { getCommitActivity, mapGithubResponse } from "./commitActivity";
import { isFutureDate } from "@utils";
import { makeRequest } from "./makeRequest";

jest.mock("@utils", () => ({
  getColorIndex: jest.fn().mockReturnValue(0),
  isFutureDate: jest.fn().mockReturnValue(false),
}));
const mockedIsFutureDate = isFutureDate as jest.Mock;

jest.mock("@services/makeRequest", () => ({
  makeRequest: jest.fn().mockImplementation(() => ({
    data: mockedGithubResponse,
    error: false,
  })),
}));
const mockedMakeRequest = makeRequest as jest.Mock;

describe("getCommitActivity", () => {
  it("should return parsed commit activity with no error", async () => {
    const response = await getCommitActivity();
    expect(response).toEqual({
      error: false,
      data: mockedParsedResponse,
    });
  });

  it("should skip days if data is corrupted", async () => {
    mockedGithubResponse[0].days = [0, 1, 2, 3, 4, 5, 6, 7];
    const response = await getCommitActivity();
    expect(response).toEqual({
      error: false,
      data: mockedParsedResponse,
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
  it("should return empty array for each week day if no data is provided", () => {
    const response = mapGithubResponse([]);
    expect(response).toEqual(emptyParsedResponse);
  });

  it("should return commit activity for each week day", () => {
    const response = mapGithubResponse(mockedGithubResponse);
    expect(response).toEqual(mockedParsedResponse);
  });

  it("should not include future dates", () => {
    mockedIsFutureDate.mockReturnValue(true);
    const response = mapGithubResponse(mockedGithubResponse);
    expect(response).toEqual(emptyParsedResponse);
  });
});
