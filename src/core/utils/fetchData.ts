import { api } from "../services";

export const fetchData = async (
  endpoint: string,
  params?: Record<string, unknown>
) => {
  try {
    const response = await api.get(endpoint, { params });
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};
