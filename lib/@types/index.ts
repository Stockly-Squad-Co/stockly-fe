import { ReactNode } from "react";
import {
  CollectionStatus,
  OrderPaymentStatus,
  OrderStatus,
  ProductHistorySource,
  ProductStatus,
  ProductUnits,
} from "../enums";

export interface ApiResponse<T = any, M = any> {
  status: boolean;
  msg: string;
  data: T;
  meta?: M;
}

export interface TabsDto {
  header: string;
  widget: ReactNode;
}

export type DateRange =
  | "today"
  | "yesterday"
  | "this-week"
  | "last-week"
  | "this-month"
  | "last-month"
  | "custom";

/** dtos */
export interface CreateCustomer {
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  email?: string;
  additional_information: string;
  shipping_address: Address;
}

export interface CreateCollection {
  name: string;
  description: string;
  image?: File | string;
  products: string[];
}

export interface CreateProduct {
  images: File[];
  name: string;
  description: string;
  collections: Collections[];
  price: number;
  costPrice: number;
  thumbnailImageIndex: number;
  quantityAvailable: number;
  lowStockLevelAlert: number;
  unit: ProductUnits;
  unit_value: number;
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

export type Customer = {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  additional_information: string;
  profilePicture: string;
  customer_code: string;
  status: "ACTIVE" | "INACTIVE";
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

export type InventoryOverview = {
  totalInventoryValue: number;
  totalSold: number;
  outOfStock: number;
};

export interface ApiResponse<T> {
  status: boolean;
  msg: string;
  data: T;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  profilePicture: string;
  store: Store;
}

export interface Store {
  _id: string;
  address: Address;
  bankDetails: BankDetails;
  description: string;
  email: string;
  logo: string;
  name: string;
  phoneNumber: string;
  sector: string;
  slogan: string;
  slug: string;
  store_business_id: number;
}

export interface BankDetails {
  bank_name: string;
  account_number: string;
  account_name: string;
  bank_code: string;
}

export interface Collection {
  _id: string;
  name: string;
  description: string;
  image: string;
}

export interface Order {
  cart: { product: string; quantity: number }[];
  customer: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
  };
  orderDate: string;
  type: "PICKUP" | "DELIVERY";
  address: {
    state: string;
    city: string;
    zip_code: string;
    street_address: string;
  };
}

export interface Transaction {
  _id: string;
  transaction_reference: string;
  transaction_type: string;
  purpose: string;
  customer: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  amount: number;
  status: "SUCCESSFUL" | "PENDING" | "FAILED";
  direction: "INFLOW" | "OUTFLOW";
  order: {
    _id: string;
    salesChannel: string;
    sku: string;
  };
  createdAt: string;
}
