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



export const fetchCart = (params?: URLSearchParams) => {
    return fetch({
      url: `${api}`,
      method: 'GET',
      params
    });
  };