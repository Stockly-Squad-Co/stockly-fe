export enum OrderStatus {
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
  PROCESSING = 'Processing',
  OPEN = 'Open',
}

export enum ShippingStatus {
  SHIPPED = 'Shipped',
  DELIVERED = 'Delivered',
  AWAITING_SHIPPING = 'Awaiting Shipping',
  RETURNED = 'Returned',
  PICKED_UP = 'Picked Up',
}

export enum OrderPaymentStatus {
  PAID = 'Paid',
  UNPAID = 'Unpaid',
}
