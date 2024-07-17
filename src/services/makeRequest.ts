type Response<T> = {
  data: T | null;
  error: boolean;
};

export const makeRequest = async <T>(url: string): Promise<Response<T>> => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }

    return { data, error: false };
  } catch (err) {
    // In a production environment, we would log the error to an external service for tracking
    console.error("Error while fetching data:", err);
    return { data: null, error: true };
  }
};
