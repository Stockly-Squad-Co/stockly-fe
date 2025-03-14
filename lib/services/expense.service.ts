import { ApiResponse, Expense } from "../@types";
import { authApi } from "../configs/axios-instance";

export const getExpenses = async () => {
  try {
    const {
      data: { data },
    } = await authApi.get<ApiResponse<Expense[]>>("/payment/expense");
    return data;
  } catch (err: any) {
    throw new Error(err?.response.data.msg || "Something went wrong");
  }
};
