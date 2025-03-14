import { ApiResponse, Expense, ExpenseFormValues } from "../@types";
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

export const createExpense = async (expense: ExpenseFormValues) => {
  try {
    const { data } = await authApi.post<ApiResponse<Expense>>(
      "/payment/expense",
      expense
    );
    return data;
  } catch (err: any) {
    throw new Error(err?.response.data.msg || "Something went wrong");
  }
};
