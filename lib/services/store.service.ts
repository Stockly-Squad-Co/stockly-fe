import { ApiResponse, Collection, Product, Store } from "../@types";
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

export const getStoreInfo = async (slug: string) => {
  try {
    const {
      data: { data },
    } = await publicApi.get<ApiResponse<Store>>(`/store/slug/${slug}`);
    return data;
  } catch (err: any) {
    throw new Error(err?.response.data.msg || "Something went wrong");
  }
};

export const fetchCollections = async (slug: string) => {
  try {
    const {
      data: { data },
    } = await publicApi.get<ApiResponse<Collection[]>>(
      `/product/store/${slug}/collections`
    );
    return data;
  } catch (err: any) {
    throw new Error(err?.response.data.msg || "Something went wrong");
  }
};

export const fetchProducts = async ({
  slug,
  search,
  collection,
}: {
  slug: string;
  search?: string;
  collection?: string;
}) => {
  const searchParams = new URLSearchParams();
  if (search) searchParams.append("search", search);
  if (collection) searchParams.append("collection", collection);

  try {
    const {
      data: { data },
    } = await publicApi.get<ApiResponse<Product[]>>(
      `/product/store/${slug}/products?${searchParams.toString()}`
    );
    return data;
  } catch (err: any) {
    throw new Error(err?.response.data.msg || "Something went wrong");
  }
};
