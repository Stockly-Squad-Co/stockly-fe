import { ApiResponse, CreateDiscount, Discount, Product } from '../@types';
import { authApi } from '../configs/axios-instance';

export const getDiscounts = async () => {
  try {
    const response = await authApi.get<ApiResponse<Discount[]>>(
      '/product/discount'
    );

    return response?.data?.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.msg || 'Something went wrong');
  }
};

export const getDiscount = async (discountId: string) => {
  try {
    const response = await authApi.get<ApiResponse<Discount>>(
      `/product/discount/${discountId}`
    );

    return response?.data?.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.msg || 'Something went wrong');
  }
};

export const deleteDiscount = async (discountId: string) => {
  try {
    const response = await authApi.delete<ApiResponse>(
      `/product/discount/${discountId}`
    );

    return response?.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.msg || 'Something went wrong');
  }
};

export const createDiscount = async (body: CreateDiscount) => {
  try {
    const response = await authApi.post<ApiResponse<Discount>>(
      '/product/discount',
      { ...body, products: body.products.map((p) => p._id) }
    );

    return response?.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.msg || 'Something went wrong');
  }
};

export const removeProductFromDiscount = async (
  discount_id: string,
  product_id: string
) => {
  try {
    const response = await authApi.patch(
      `/product/discount/${discount_id}/remove-product`,
      { product_id }
    );

    return response?.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.msg || 'Something went wrong');
  }
};

export const addProductToDiscount = async (
  discount_id: string,
  product_id: string
) => {
  try {
    const response = await authApi.patch(
      `/product/discount/${discount_id}/add-product`,
      { product_id }
    );

    return response?.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.msg || 'Something went wrong');
  }
};

export const getDiscountableProducts = async () => {
  try {
    const response = await authApi.get<ApiResponse<Product[]>>(
      '/product/discountable-products'
    );

    return response?.data?.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.msg || 'Something went wrong');
  }
};
