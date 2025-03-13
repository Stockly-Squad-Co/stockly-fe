import { authApi } from '../configs/axios-instance';
import { ApiResponse, User } from '../@types';

export const getUserInfo = async () => {
  try {
    const {
      data: { data },
    } = await authApi.get<ApiResponse<User>>(`/user`);
    return data;
  } catch (err: any) {
    throw new Error(err?.response.data.msg || 'Something went wrong');
  }
};
