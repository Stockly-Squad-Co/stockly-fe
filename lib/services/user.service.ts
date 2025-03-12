import { ApiResponse } from '../@types';
import { User } from '../@types/auth';
import { authApi } from '../configs/axios-instance';

export const getUser = async () => {
  try {
    const response = await authApi.get<ApiResponse<User>>('/user');

    return response?.data?.data;
  } catch (err: any) {
    throw new Error(err?.response.data.msg || 'Something went wrong');
  }
};
