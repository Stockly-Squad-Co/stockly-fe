import { ApiResponse, CreateCustomer, Customer } from '../@types';
import { authApi } from '../configs/axios-instance';

export const getCustomers = async () => {
  try {
    const response = await authApi.get<
      ApiResponse<Customer[], { totalCount: number }>
    >('/customer');

    return response?.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.msg || 'Unable to fetch customers');
  }
};

export const createCustomer = async (body: CreateCustomer) => {
  try {
    const response = await authApi.post<ApiResponse>('/customer', body);

    return response?.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.msg || 'Something went wrong');
  }
};
