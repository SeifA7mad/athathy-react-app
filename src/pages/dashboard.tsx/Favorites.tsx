import DashboardLayout from '@src/components/page-content/dashboard/DashboardLayout';
import WishlistProductItem from '@src/components/shared/WishlistProductItem';
import { APP_PREFIX_PATH } from '@src/configs/AppConfig';
import { QueriesKeysEnum } from '@src/configs/QueriesConfig';
import { RouteKeysEnum } from '@src/configs/RoutesConfig';
import useWishlistItems from '@src/hooks/useWishlistItems';
import { fetchWishlist } from '@src/services/WishlistService';
import { useQuery } from '@tanstack/react-query';
import { Spin } from 'antd';
import { useNavigate } from 'react-router-dom';

const Favourites = () => {
  const navigate = useNavigate();
  const {
    data: wishlistProducts,
    isFetching,
    refetch
  } = useQuery({
    queryKey: [QueriesKeysEnum.WISH_LIST],
    queryFn: async () => fetchWishlist(),
    initialData: null
  });

  const { onAddToCart, onRemoveItemWishlist } = useWishlistItems({
    onRemoveItemWishlistCb: refetch
  });

  const onNavigateToProduct = (productId: string, templateId: string) => {
    navigate(
      `${APP_PREFIX_PATH}/${RouteKeysEnum.productDetails}/${templateId}/${productId}`
    );
  };
  return (
    <DashboardLayout title='Favourites'>
      {isFetching && <Spin />}
      {!isFetching && wishlistProducts && (
        <div className='w-full md:w-11/12 grid grid-cols-fav-list gap-y-[.9375rem] gap-x-[1.25rem]'>
          {wishlistProducts?.items.map((product) => (
            <WishlistProductItem
              onNavigateToProduct={onNavigateToProduct}
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onRemoveItemWishlist={onRemoveItemWishlist || (() => {})}
            />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default Favourites;
