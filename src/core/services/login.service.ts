import { endpoints } from "../configs/endpoints";
import { postData } from "../utils/postData";

export const getTokenByTgInitData = async (initData: string) => {
  try {
    const response = await postData(`${endpoints.users}`, { initData });
    if (!response || !response.data) {
      throw new Error("Response data is missing");
    }
    return response.data;
  } catch (error: any) {
    console.error("Error in getTokenByTgInitData", error);
    throw error;
  }
};
