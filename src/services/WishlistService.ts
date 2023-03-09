import { WishlistProductsType } from '@src/types/API/WishlistType';
import fetch from '@src/utils/FetchInterceptor';

const api = 'wishlist';

export const addItemToWishlist = (data: { productId: string }) => {
  return fetch({
    url: `${api}`,
    method: 'POST',
    data
  });
};

export const fetchWishlist = async (
  params?: URLSearchParams
): Promise<WishlistProductsType> => {
  const response = await fetch({
    url: `${api}`,
    method: 'GET',
    params
  });

  return response.data;
};

export const removeItemFromWishlist = (productId: string) => {
  return fetch({
    url: `${api}/${productId}`,
    method: 'DELETE'
  });
};
