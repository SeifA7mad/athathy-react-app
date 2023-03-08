import fetch from '@src/utils/FetchInterceptor';

const api = 'wishlist';

export const addItemToWishlist = (data: {
    productId: string;
}) => {
  return fetch({
    url: `${api}`,
    method: 'POST',
    data
  });
};


export const fetchWishlist = (params?: URLSearchParams) => {
    return fetch({
      url: `${api}`,
      method: 'GET',
      params
    });
  };