import { RequestOrderType } from '@src/types/API/OrderType';
import fetch from '@src/utils/FetchInterceptor';

const api = 'order/customer';

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
