import { CartProductsType } from '@src/types/API/CartType';
import fetch from '@src/utils/FetchInterceptor';

const api = 'cart';

export const addItemToCart = (data: {
  productId: string;
  quantity: number;
}) => {
  return fetch({
    url: `${api}/item`,
    method: 'POST',
    data
  });
};

export const fetchCart = async (
  params?: URLSearchParams
): Promise<CartProductsType> => {
  const response = await fetch({
    url: `${api}`,
    method: 'GET',
    params
  });

  return response.data;
};

export const removeItemFromCart = (productId: string) => {
  return fetch({
    url: `${api}/item/${productId}`,
    method: 'DELETE'
  });
};

export const updateItemQuantity = (
  productId: string,
  data: {
    quantity: number;
  }
) => {
  return fetch({
    url: `${api}/item/${productId}/quantity`,
    method: 'PUT',
    data
  });
};
