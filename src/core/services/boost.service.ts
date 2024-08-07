import { endpoints } from "../configs/endpoints";
import { fetchData } from "../utils/fetchData";
import { postData } from "../utils/postData";

export const getBoosts = (telegramId: string) =>
  fetchData(`${endpoints.boosts}`, {
    telegramId,
  });

export const activeBoost = async (id: number, telegramId: string) => {
  try {
    const response = await postData(`${endpoints.boosts}/${id}`, {
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
