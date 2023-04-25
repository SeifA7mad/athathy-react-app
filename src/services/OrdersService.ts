import { RequestOrderType } from '@src/types/API/OrderType';
import {
  OrderDetailsType,
  OrderItemType,
  OrderType
} from '@src/types/API/OrdersType';
import fetch from '@src/utils/FetchInterceptor';

const api = 'order/customer';

export const fetchOrdersItems = async (
  params?: URLSearchParams
): Promise<OrderItemType[]> => {
  const response = await fetch({
    url: `${api}/view_all_items`,
    method: 'GET',
    params
  });

  return response.data;
};

export const fetchOrders = async (
  params?: URLSearchParams
): Promise<OrderDetailsType[]> => {
  const response = await fetch({
    url: `${api}/view_all`,
    method: 'GET',
    params
  });

  return response.data;
};

export const checkIfDeliverable = async (data: {
  fromCart: boolean;
  items?: string[];
  shippingAddressId: string;
}) => {
  const response = await fetch({
    url: `${api}/checkIfDeliverable/byAddress`,
    method: 'POST',
    data
  });

  return response as unknown as {
    isDeliver: boolean;
    undeliverableItems: {
      id: string;
      name: string;
      price: number;
    }[];
  };
};

export const placeOrder = async (data: RequestOrderType) => {
  const response = await fetch({
    url: `${api}/request`,
    method: 'POST',
    data
  });

  return response as unknown as {
    requestId: string;
    orderAccepted: boolean;
    shipments: {
      shipmentName: string;
      itemIds: string[];
      availableDeliveryOptions: string[];
      vendorId: string;
    }[];
    items: {
      id: string;
      name: string;
      price: number;
      basePrice: number;
      taxableAmount: number;
      quantity: number;
      discount: number;
      tax: number;
    }[];
  };
};

export const returnOrderItem = async (
  orderId: string,
  data: {
    itemIds: string[];
    refundMode: 'WALLET' | 'BANK_ACCOUNT';
    returnQuantity: number;
    returnMode: 'RETURN' | 'REPLACEMENT';
    remark: string;
    images: string[];
  }
) => {
  const response = await fetch({
    url: `${api}/${orderId}`,
    method: 'PUT',
    data
  });

  return response.data as OrderType;
};

export const cancelOrder = async (orderId: string, itemIds: string[]) => {
  const response = await fetch({
    url: `${api}/${orderId}`,
    data: itemIds,
    method: 'POST'
  });

  return true;
};

export const ReOrder = async (orderId: string) => {
  const response = await fetch({
    url: `${api}/reorder/${orderId}`,
    method: 'POST'
  });

  return true;
};

export const applyCoupon = async (couponCode: string) => {
  const response = await fetch({
    url: `coupon/applycoupon/${couponCode}`,
    method: 'GET'
  });

  return response.data as {
    code: string;
    discount: number;
  };
};
