import { ApiResponse } from "../@types";
import { DashboardStats } from "../@types/dashboard.types";
import { authApi } from "../configs/axios-instance";

export const fetchDashboardData = async () => {
  try {
    const response = await authApi.get<ApiResponse<DashboardStats>>(
      `/analytics/dashboard`
    );

    return response?.data?.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.msg || "Something went wrong");
  }
};
