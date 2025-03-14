import {
  Address,
  ApiResponse,
  GeneratePaymentLink,
  OrderOverview,
  StoreOrder,
} from '../@types';
import { authApi } from '../configs/axios-instance';
import { OrderPaymentStatus, PaymentMethod, ShippingStatus } from '../enums';

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

export const getOrder = async (id: string) => {
  try {
    const response = await authApi.get<ApiResponse<StoreOrder>>(`/order/${id}`);

    return response?.data?.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.msg || 'Something went wrong');
  }
};

export const updateShippingAddress = async (
  id: string,
  address: Address & { state: string }
) => {
  try {
    const response = await authApi.patch(
      `/order/${id}/shipping-address`,
      address
    );

    return response?.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.msg || 'Something went wrong');
  }
};

export const updateOrderShippingStatus = async (
  id: string,
  status: ShippingStatus
) => {
  try {
    const response = await authApi.patch(`/order/${id}/shipping-status`, {
      status,
    });

    return response?.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.msg || 'Something went wrong');
  }
};

export const updatePaymentStatus = async (
  id: string,
  paymentMethod: PaymentMethod
) => {
  try {
    const response = await authApi.patch(`/order/${id}/payment-status`, {
      paymentMethod,
    });

    return response?.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.msg || 'Something went wrong');
  }
};

export const generateOrderPaymentLink = async (id: string) => {
  try {
    const response = await authApi.get<ApiResponse<GeneratePaymentLink>>(
      `/order/${id}/payment-link`
    );

    return response?.data?.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.msg || 'Something went wrong');
  }
};
