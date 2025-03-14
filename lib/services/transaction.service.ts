import {
  ApiResponse,
  Transaction,
  TransactionOverview,
  Wallet,
} from '../@types';
import { authApi } from '../configs/axios-instance';

export const getTransactions = async () => {
  try {
    const {
      data: { data },
    } = await authApi.get<ApiResponse<Transaction[]>>('/payment/transaction');
    return data;
  } catch (err: any) {
    throw new Error(err?.response.data.msg || 'Something went wrong');
  }
};

export const getTransactionsOverview = async () => {
  try {
    const response = await authApi.get<ApiResponse<TransactionOverview>>(
      '/payment/transaction/overview'
    );

    return response?.data?.data;
  } catch (err: any) {
    throw new Error(err?.response.data.msg || 'Something went wrong');
  }
};

export const getWallet = async () => {
  try {
    const response = await authApi.get<ApiResponse<Wallet>>('/payment/wallet');

    return response?.data?.data;
  } catch (err: any) {
    throw new Error(err?.response.data.msg || 'Something went wrong');
  }
};
