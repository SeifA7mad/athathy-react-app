import { addItemToCart } from '@src/services/CartService';
import { removeItemFromWishlist } from '@src/services/WishlistService';
import { useMutation } from '@tanstack/react-query';
import { message, notification } from 'antd';


interface WishlistItemsArgs {
    onAddToCartCb?: () => void;
    onRemoveItemWishlistCb?: () => void;
}

const useWishlistItems = ({
    onAddToCartCb,
    onRemoveItemWishlistCb
} :WishlistItemsArgs) => {
    const { mutateAsync: onAddToCartMutation } = useMutation({
        mutationFn: async (data: { productId: string; quantity: number }) =>
          addItemToCart(data)
      });
    
      const { mutateAsync: removeItemFromWishlistMutation } = useMutation({
        mutationFn: async (data: { productId: string }) =>
          removeItemFromWishlist(data.productId)
      });
    
      const onAddToCart = async (productId: string) => {
        try {
          message.loading('Adding to cart', 0);
          await onAddToCartMutation({ productId, quantity: 1 });
          onAddToCartCb && onAddToCartCb();
        } catch (error: any) {
          if (error.response?.status === 409) {
            notification.info({
              message: 'Item already in cart'
            });
            return;
          }
          notification.error({
            message: "Couldn't add item to cart"
          });
        } finally {
          message.destroy();
        }
      };
      const onRemoveItemWishlist = async (productId: string) => {
        try {
          await removeItemFromWishlistMutation({ productId });
          onRemoveItemWishlistCb && onRemoveItemWishlistCb();
        } catch (error: any) {
          notification.error({
            message: "Couldn't remove item from wishlist"
          });
        }
      };

      return {
            onAddToCart,
            onRemoveItemWishlist
      }
}

export default useWishlistItems