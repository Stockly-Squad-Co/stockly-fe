import { ApiResponse, OrderOverview, StoreOrder } from '../@types';
import { authApi } from '../configs/axios-instance';

export const getOrdersOverview = async () => {
  try {
    const response = await authApi.get<ApiResponse<OrderOverview>>(
      '/order/overview'
    );

    return response?.data?.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.msg || 'Something went wrong');
  }
};

export const getOrders = async () => {
  try {
    const response = await authApi.get<ApiResponse<StoreOrder[]>>('/order');

    return response?.data?.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.msg || 'Something went wrong');
  }
};
