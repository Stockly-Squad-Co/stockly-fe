import { ApiResponse } from '../@types';
import { publicApi } from '../configs/axios-instance';

export const getBanks = async () => {
  try {
    const {
      data: { data },
    } = await publicApi.get<
      ApiResponse<{ bank_name: string; bank_code: string }[]>
    >('payment/banks');
    return data;
  } catch (err: any) {
    throw new Error(err?.response?.data?.msg || 'Fetching banks failed');
  }
};

export const lookupAccount = async () => {
  try {
    return {
      account_name: 'ADEJARE DANIEL OLUWADUNSIN',
      account_number: '0012545622',
      bank_code: '000013',
      bank_name: 'GTBank Plc',
    };
  } catch (err: any) {
    throw new Error(err?.response?.data?.msg || 'Account lookup failed');
  }
};
