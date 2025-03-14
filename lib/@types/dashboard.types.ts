export interface DashboardStats {
  orders_count: number;
  total_products_sold: number;
  new_customers: number;
  websites_visits_count: number;
  total_sales_amount: number;
  totalSettled: number;
  totalOwed: number;
  offlineSales: number;
  recentOrders: RecentOrder[];
  topChannels: TopChannel[];
  revenueOverview: RevenueOverview[];
}

export interface RevenueOverview {
  _id: string;
  total: number;
  date: string;
}

export interface RecentOrder {
  _id: string;
  customer?: string;
  orderDate: string;
  totalAmount: number;
  metaCustomer?: MetaCustomer;
  shippingStatus?: string;
}

export interface MetaCustomer {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  _id: string;
  id: string;
}

export interface TopChannel {
  _id: string;
  total: number;
}
