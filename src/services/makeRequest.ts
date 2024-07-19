type Response<T> = {
  data: T | null;
  error: boolean;
};

const DEFAULT_REVALIDATION = 60 * 60 * 12; // 12 hours
export const makeRequest = async <T>(
  url: string,
  revalidate = DEFAULT_REVALIDATION
): Promise<Response<T>> => {
  try {
    const response = await fetch(url, { next: { revalidate } });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }

    return { data, error: false };
  } catch (err) {
    console.error("Error while fetching data:", err);
    return { data: null, error: true };
  }
};
