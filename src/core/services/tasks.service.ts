import { endpoints } from "../configs/endpoints";
import { fetchData } from "../utils/fetchData";
import { postData } from "../utils/postData";

export const getTasks = (telegramId: string) =>
  fetchData(`${endpoints.tasks}`, {
    telegramId,
  });

export const complete = async (id: number, telegramId: string) => {
  try {
    const response = await postData(`${endpoints.tasks}/${id}`, {
      telegramId,
    });
    if (!response || !response.data) {
      throw new Error("Response data is missing");
    }
    return response.data;
  } catch (error: any) {
    console.error("Error", error);
    throw error;
  }
};
