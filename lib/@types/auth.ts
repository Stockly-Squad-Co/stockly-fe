export interface IUser {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  accessToken: string;
  refreshToken: string;
}

export interface LoginType {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: string;
  refreshTokenExpiresAt: string;
  nextStep?: 'store-profile' | 'password-setup' | 'email-verification';
}

export type RegisterType = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
};

export interface StoreSetup {
  storeName: string;
  storeSlogan: string;
  storeDescription: string;
  storeSector: string;
  storePhoneNumber: string;
  storeEmail: string;
  storeAddress: {
    state: string;
    city: string;
    zip_code: string;
    street_address: string;
  };
  storeBankDetails: {
    bank_name: string;
    account_number: string;
    account_name: string;
    bank_code: string;
  };
  storeLogo: string;
}

export interface StoreSetupResponse {
  _id: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
  address: {
    state: string;
    city: string;
    zip_code: string;
    street_address: string;
  };
  bankDetails: {
    bank_name: string;
    account_number: string;
    account_name: string;
    bank_code: string;
  };
  description: string;
  email: string;
  logo: string;
  logo_public_id: string;
  name: string;
  phoneNumber: string;
  sector: string;
  slogan: string;
  slug: string;
}
