<<<<<<< HEAD
import { ApiResponse } from '../@types';
import { User } from '../@types/auth';
import { authApi } from '../configs/axios-instance';

export const getUser = async () => {
  try {
    const response = await authApi.get<ApiResponse<User>>('/user');

    return response?.data?.data;
  } catch (err: any) {
    throw new Error(err?.response.data.msg || 'Something went wrong');
=======
import { authApi } from "../configs/axios-instance";
import { ApiResponse, User } from "../@types";

export const getUserInfo = async () => {
  try {
    const {
      data: { data },
    } = await authApi.get<ApiResponse<User>>(`/user`);
    return data;
  } catch (err: any) {
    throw new Error(err?.response.data.msg || "Something went wrong");
>>>>>>> 23c1daa9f9507dc1e310253fcbe9c50c35407e1e
  }
};
