import { endpoints } from "../configs/endpoints";
import { fetchData } from "../utils/fetchData";
import { postData } from "../utils/postData";

export const getFriends = (telegramId: string) =>
  fetchData(`${endpoints.friends}`, {
    telegramId,
  });

export const addReferral = async (invite: string, telegramId: string) => {
  try {
    const response = await postData(`${endpoints.friends}`, {
      invite,
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
