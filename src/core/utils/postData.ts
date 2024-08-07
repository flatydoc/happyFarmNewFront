import { api } from "../services";

export const postData = async (
  endpoint: string,
  data: Record<string, unknown>
) => {
  try {
    const response = await api.post(endpoint, data);
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};
