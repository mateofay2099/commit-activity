import { makeRequest } from "./makeRequest";

const testData = { test: "test" };

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(testData),
  } as Response)
);
const mockedFetch = fetch as jest.Mock;

const consoleErrorSpy = jest.spyOn(console, "error");

describe("makeRequest", () => {
  it("should return response data and no error", async () => {
    const response = await makeRequest("testUrl");
    expect(response).toEqual({
      data: testData,
      error: false,
    });
  });

  it("should return error if request is not ok", async () => {
    mockedFetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: "error" }),
      } as Response)
    );

    const response = await makeRequest("testUrl");
    expect(response).toEqual({
      data: null,
      error: true,
    });
    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  it("should return error if fetch fails", async () => {
    mockedFetch.mockImplementationOnce(() => Promise.reject("error"));

    const response = await makeRequest("testUrl");
    expect(response).toEqual({
      data: null,
      error: true,
    });
    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  it("should return error if response.json fails", async () => {
    mockedFetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.reject("error"),
      } as Response)
    );

    const response = await makeRequest("testUrl");
    expect(response).toEqual({
      data: null,
      error: true,
    });
    expect(consoleErrorSpy).toHaveBeenCalled();
  });
});
