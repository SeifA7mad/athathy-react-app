import { useMutation, useQuery } from '@tanstack/react-query';
import { useAppSelector } from './redux-hook';
import {
  addItemToCart,
  fetchCart,
  removeItemFromCart
} from '@src/services/CartService';
import {
  addItemToWishlist,
  fetchWishlist,
  removeItemFromWishlist
} from '@src/services/WishlistService';
import { QueriesKeysEnum } from '@src/configs/QueriesConfig';
import { useMemo } from 'react';
import { APP_PREFIX_PATH, UNAUTHENTICATED_ENTRY } from '@src/configs/AppConfig';
import { useLocation, useNavigate } from 'react-router-dom';
import { message, notification } from 'antd';

interface ProductActionsProps {
  productId: string;
  enabled?: boolean;
}

export default function useProductActions({
  productId,
  enabled = true
}: ProductActionsProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const fallbackPath = location.pathname.slice(1).split('/');

  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

  const { mutateAsync: onAddToCartMutation } = useMutation({
    mutationFn: async (data: { productId: string; quantity: number }) =>
      addItemToCart(data)
  });

  const { mutateAsync: removeItemFromCartMutation } = useMutation({
    mutationFn: async (data: { productId: string }) =>
      removeItemFromCart(data.productId)
  });

  const { mutateAsync: onAddToWishlistMutation } = useMutation({
    mutationFn: async (data: { productId: string }) => addItemToWishlist(data)
  });

  const { mutateAsync: removeItemFromWishlistMutation } = useMutation({
    mutationFn: async (data: { productId: string }) =>
      removeItemFromWishlist(data.productId)
  });

  const { data: cartProducts, refetch: refetchCart } = useQuery({
    queryKey: [QueriesKeysEnum.CART],
    queryFn: async () => fetchCart(),
    initialData: null,
    enabled: enabled && isLoggedIn
  });

  const isAddedToCart = useMemo(
    () =>
      cartProducts?.items.some((cartItem) => productId === cartItem.product.id),
    [cartProducts, productId]
  );

  const { data: wishlistProducts, refetch: refetchWishList } = useQuery({
    queryKey: [QueriesKeysEnum.WISH_LIST],
    queryFn: async () => fetchWishlist(),
    initialData: null,
    enabled: enabled && isLoggedIn
  });

  const isAddedToWishlist = useMemo(
    () =>
      wishlistProducts?.items.some(
        (wishlistItem) => productId === wishlistItem.id
      ),
    [wishlistProducts, productId]
  );

  const onAddToCart = async (productId: string, quantity: number) => {
    if (!isLoggedIn) {
      navigate(`${APP_PREFIX_PATH}/${fallbackPath}/${UNAUTHENTICATED_ENTRY}`);
      return;
    }
    if (isAddedToCart) {
      message.loading('Removing from cart', 0);
      await removeItemFromCartMutation({ productId });
    } else {
      try {
        message.loading('Adding to cart', 0);
        await onAddToCartMutation({ productId, quantity });
        notification.success({
          message: 'Added to cart'
        });
      } catch (error: any) {
        if (error.response?.status === 409) {
          notification.info({
            message: 'Product already in cart'
          });
          return;
        }
        notification.error({
          message: "Couldn't add to cart"
        });
      }
    }
    message.destroy();
    refetchCart();
  };

  const onAddToWishlist = async (productId: string) => {
    if (!isLoggedIn) {
      navigate(`${APP_PREFIX_PATH}/${fallbackPath}/${UNAUTHENTICATED_ENTRY}`);
      return;
    }
    if (isAddedToWishlist) {
      message.loading('Removing from wishlist', 0);
      await removeItemFromWishlistMutation({ productId });
    } else {
      try {
        message.loading('Adding to wishlist', 0);
        await onAddToWishlistMutation({ productId });

        notification.success({
          message: 'Added to wishlist'
        });
      } catch (error: any) {
        if (error.response?.status === 409) {
          notification.info({
            message: 'Item already in wishlist'
          });
          return;
        }
        notification.error({
          message: "Couldn't add to wishlist"
        });
      }
    }
    message.destroy();
    refetchWishList();
  };

  return {
    onAddToCart,
    onAddToWishlist,
    isAddedToCart,
    isAddedToWishlist
  };
}
