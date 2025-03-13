import {
  CollectionStatus,
  OrderPaymentStatus,
  OrderStatus,
  ProductHistorySource,
  ProductStatus,
  ProductUnits,
} from '../enums';

export interface ApiResponse<T = any, M = any> {
  status: boolean;
  msg: string;
  data: T;
  meta?: M;
}

export type DateRange =
  | 'today'
  | 'yesterday'
  | 'this-week'
  | 'last-week'
  | 'this-month'
  | 'last-month'
  | 'custom';

/** dtos */
export interface CreateCustomer {
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  email?: string;
  additional_information: string;
  shipping_address: Address;
}

/** db types */

export type Address = {
  state: {
    id: string;
    name: string;
  };
  city: string;
  street_address: string;
  zip_code: string;
};

export type Store = {
  address: Address;
  bankDetails: {
    bank_name: string;
    account_number: string;
    account_name: string;
    bank_code: string;
  };
  email: string;
  logo: string;
  name: string;
  phoneNumber: string;
  sector: string;
  slogan: string;
  store_business_id: number;
  slug: string;
};

export type User = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  profilePicture: string;
  store: Store;
};

export type Customer = {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  additional_information: string;
  profilePicture: string;
  customer_code: string;
  status: 'ACTIVE' | 'INACTIVE';
  shipping_address: Address;
  createdAt: Date;
  purchase_history: PurchaseHistory[];
  totalAmountSpent: number;
  totalOrders: number;
  totalOrdersValue: number;
  lastOrderDate: Date;
};

export type PurchaseHistory = {
  _id: string;
  orderStatus: OrderStatus;
  paymentStatus: OrderPaymentStatus;
  totalAmount: number;
  sku: string;
  createdAt: Date;
  customer_name: string;
};

export type Product = {
  _id: string;
  createdAt: Date;
  name: string;
  slug: string;
  description: string;
  images: string[];
  display_image: string;
  price: number;
  costPrice: number;
  quantityAvailable: number;
  lowStockLevelAlert: number;
  status: ProductStatus;
  unit: ProductUnits;
  unit_value: number;
  pid: number;
  collection_count: number;
  is_discounted: boolean;
  discountedPrice: number;
  collections: Collections[];
  totalRemoved: number;
  totalSold: number;
  totalAdded: number;
  totalReturned: number;
  history: ProductHistory[];
};

export type ProductHistory = {
  _id: string;
  source: ProductHistorySource;
  quantity_effected: number;
  quantity_before: number;
  quantity_after: number;
  activity: string;
  createdAt: Date;
};

export type Collections = {
  _id: string;
  name: string;
  description: string;
  image: string;
  totalProducts: number;
  allProducts: Product[];
  unpublishedProducts: Product[];
  publishedProducts: Product[];
  slug: string;
  status: CollectionStatus;
  createdAt: Date;
};
