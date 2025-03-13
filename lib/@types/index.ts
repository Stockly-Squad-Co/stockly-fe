export interface ApiResponse<T> {
  status: boolean;
  msg: string;
  data: T;
}

export type DateRange =
  | "today"
  | "yesterday"
  | "this-week"
  | "last-week"
  | "this-month"
  | "last-month"
  | "custom";

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

export interface Address {
  state: {
    _id: string;
    name: string;
  };
  city: string;
  zip_code: string;
  street_address: string;
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

export interface Product {
  _id: string;
  name: string;
  images: string[];
  display_image: string;
  price: number;
  unit: string;
  unit_value: number;
  createdAt: string;
  is_discounted: boolean;
  discountedPrice?: number;
}
