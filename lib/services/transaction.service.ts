import { ApiResponse, Transaction } from "../@types";
import { authApi } from "../configs/axios-instance";

export const getTransactions = async () => {
  try {
    const {
      data: { data },
    } = await authApi.get<ApiResponse<Transaction[]>>("/payment/transaction");
    return data;
  } catch (err: any) {
    throw new Error(err?.response.data.msg || "Something went wrong");
  }
};
