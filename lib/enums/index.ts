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

export enum ProductStatus {
  PUBLISHED = 'PUBLISHED',
  UNPUBLISHED = 'UNPUBLISHED',
}

export enum CollectionStatus {
  ACTIVE = 'ACTIVE',
}

export enum ProductHistorySource {
  SALE = 'SALE',
  ADJUSTMENT = 'ADJUSTMENT',
  RETURN = 'RETURN',
}

export enum ProductUnits {
  PC = 'pc',
  BOX = 'box',
  PACK = 'pack',
  PAIR = 'pair',
  BAG = 'bag',
  CM = 'cm',
  FEET = 'feet',
  G = 'g',
  IN = 'inch',
  KG = 'kg',
  KM = 'km',
  LB = 'lb',
  MG = 'mg',
  YARD = 'yard',
  PORTION = 'portion',
  BOWL = 'bowl',
  BOTTLE = 'bottle',
  PLATE = 'plate',
  CARTON = 'carton',
}

export enum DiscountType {
  FIXED = 'FIXED',
  PERCENTAGE = 'PERCENTAGE',
}

export enum DiscountStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  EXPIRED = 'EXPIRED',
}
