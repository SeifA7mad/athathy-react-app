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
  status: 'Delivered' | 'Cancelled' | 'Returned' | 'Shipped' | 'Processing';
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
