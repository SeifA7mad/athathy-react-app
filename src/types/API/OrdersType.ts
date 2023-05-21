export interface OrderItemType {
  id: string;
  productTemplateId: string;
  vendorId: string;
  vendorName: string;
  categoryName: string;
  name: string;
  thumbnails: string[];
  images: string[];
  mrpPrice: number;
  price: number;
  basePrice: number;
  discount: number;
  priceAfterDiscount: number;
  taxableAmount: number;
  taxSplitup: {
    taxId: string;
    taxType: string;
    taxPercentage: number;
    taxAmount: number;
  }[];
  quantity: number;
  isReturnable: boolean;
  prescriptionRequired: boolean;
  productTemplateSlug: string;
  hsn: number;
  status:
    | 'Delivered'
    | 'Cancelled'
    | 'Returned'
    | 'Shipped'
    | 'Processing'
    | 'Confirmed'
    | 'Out for Delivery'
    | 'Pending'
    | 'Pending Confirmation'
    | 'Dispatched'
    | 'Payment Failed'
    | 'Payment Pending'
    | 'Return Requested'
    | 'Return Initiated';
  shipment: boolean;
  returned: boolean;
  returnQuantity: number;
  orderId: string;
  orderNo: string;
  userId: string;
  userName: string;
  orderedAt: number;
}

export interface OrderType {
  id: string;
  orderNo: string;
  userId: string;
  userName: string;
  userEmail: string;
  invoice: {
    id: string;
    invoiceNo: string;
    vendorInvoices: string[];
  };
  items: OrderItemType[];
}

export interface AddressType {
  name: string;
  mobileNumber: string;
  addressLine1: string;
  addressLine2: string;
  landmark: string;
  city: string;
  stateOrRegion: string;
  uniqueId: string;
  country: string;
  addressType: string;
  default: boolean;
}

export interface OrderDetailsType {
  createdAt: number;
  discount: number;
  id: string;
  invoice: {
    id: string;
    invoiceNo: string;
    vendorInvoices: string[];
  };
  items: OrderItemType[];
  orderNo: string;
  payment: {
    completed: boolean;
    id: string;
    status: string;
    type: string;
    billingAddress: AddressType;
  };
  shippingAddress: AddressType;
  shippingCharge: number;
  status: string;
  taxSplitup: [];
  totalAmount: number;
  updatedAt: number;
  userEmail: string;
  userId: string;
  userName: string;
  walletBalanceUsed: number;
}
