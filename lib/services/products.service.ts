import {
  ApiResponse,
  Collections,
  CreateCollection,
  CreateProduct,
  InventoryOverview,
  Product,
} from '../@types';
import { authApi } from '../configs/axios-instance';
import { ProductStatus } from '../enums';

export const getInventoryOverview = async () => {
  try {
    const response = await authApi.get<ApiResponse<InventoryOverview>>(
      '/product/inventory-overview'
    );

    return response?.data?.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.msg || 'Something went wrong');
  }
};

export const getProducts = async () => {
  try {
    const response = await authApi.get<ApiResponse<Product[]>>('/product');

    return response?.data?.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.msg || 'Something went wrong');
  }
};

export const getProduct = async (id: string) => {
  try {
    const response = await authApi.get<ApiResponse<Product>>(`/product/${id}`);

    return response?.data?.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.msg || 'Something went wrong');
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const response = await authApi.delete(`/product/${id}`);

    return response?.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.msg || 'Something went wrong');
  }
};

export const getCollections = async () => {
  try {
    const response = await authApi.get<ApiResponse<Collections[]>>(
      '/product/collection'
    );

    return response?.data?.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.msg || 'Something went wrong');
  }
};

export const getCollection = async (id: string) => {
  try {
    const response = await authApi.get<ApiResponse<Collections>>(
      `/product/collection/${id}`
    );

    return response?.data?.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.msg || 'Something went wrong');
  }
};

export const deleteCollection = async (id: string) => {
  try {
    const response = await authApi.delete(`/product/collection/${id}`);

    return response?.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.msg || 'Something went wrong');
  }
};

export const updateProductStatus = async (
  id: string,
  status: ProductStatus
) => {
  const formData = new FormData();

  formData.append('status', status);

  try {
    await authApi.put(`/product/${id}`, formData);
  } catch (error: any) {
    throw new Error(error?.response?.data?.msg || 'Something went wrong');
  }
};

export const modifyProductQuantity = async ({
  id,
  qty,
  type,
}: {
  id: string;
  qty: number;
  type: 'increase' | 'decrease';
}) => {
  try {
    await authApi.patch(
      `/product/${id}/${type === 'increase' ? 'increase-qty' : 'decrease-qty'}`,
      {
        quantity: qty,
      }
    );
  } catch (error: any) {
    throw new Error(error?.response?.data?.msg || 'Something went wrong');
  }
};

export const createCollections = async (body: CreateCollection) => {
  try {
    await authApi.post(`/product/collection`, body);
  } catch (error: any) {
    throw new Error(error?.response?.data?.msg || 'Something went wrong');
  }
};

export const createProduct = async (body: CreateProduct) => {
  const formData = new FormData();

  formData.append('name', body.name);
  formData.append('description', body.description);
  formData.append('thumbnailImageIndex', body.thumbnailImageIndex as any);
  formData.append('price', body.price as any);
  formData.append('costPrice', body.costPrice as any);
  formData.append('quantityAvailable', body.quantityAvailable as any);
  formData.append('lowStockLevelAlert', body.lowStockLevelAlert as any);

  for (const col of body.collections) {
    formData.append(
      body.collections?.length > 0 ? 'collections[]' : 'collections',
      col._id
    );
  }

  for (const image of body.images) {
    formData.append(
      body.collections?.length > 0 ? 'images[]' : 'images',
      image
    );
  }

  if (body.unit) {
    formData.append('unit', body.unit);
  }

  if (body.unit_value) {
    formData.append('unit_value', body.unit_value as any);
  }

  try {
    await authApi.post(`/product`, formData);
  } catch (error: any) {
    throw new Error(error?.response?.data?.msg || 'Something went wrong');
  }
};
