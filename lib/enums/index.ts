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

export enum SalesChannel {
  PHYSICAL_SALE = 'Physical Sale',
  INSTAGRAM = 'Instagram',
  WHATSAPP = 'Whatsapp',
  FACEBOOK = 'Facebook',
  FLUTTERWAVE = 'Flutterwave',
  SQUAD_CO = 'Squad Co',
  Jiji = 'Jiji',
  Jumia = 'Jumia',
  Konga = 'Konga',
  Paystack = 'Paystack',
  Snapchat = 'Snapchat',
  Twitter = 'Twitter',
  Ussd = 'USSD',
  Others = 'Others',
}

export enum PaymentMethod {
  QR_LINK = 'QR/Link',
  ONLINE_STORE = 'Online Store',
  CASH = 'Cash',
  POS = 'POS',
  BANK_TRANSFER = 'Bank Transfer - Terminal',
  PAYOUT_BANK_TRANSFER = 'Bank Transfer - Payout',
  USSD = 'USSD',
}
