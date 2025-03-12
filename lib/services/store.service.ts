import { StoreSetup, StoreSetupResponse } from "../@types/auth";
import { publicApi } from "../configs/axios-instance";

export const fetchStates = async () => {
  try {
    const { data } = await publicApi.get<{ _id: string; name: string }[]>(
      "location/states"
    );
    return data;
  } catch (err: any) {
    throw new Error(err?.response.data.msg || "Something went wrong");
  }
};

export const setupStore = async ({
  data: body,
  token,
}: {
  data: StoreSetup;
  token: string;
}) => {
  try {
    const { data } = await publicApi.put<StoreSetupResponse>("/store", body, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (err: any) {
    throw new Error(err?.response.data.msg || "Something went wrong");
  }
};
