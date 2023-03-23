import { useState, useRef } from 'react';
import { Carousel, Empty, message, Spin } from 'antd';
import { CarouselRef } from 'antd/es/carousel';
import CarouselNextButton from '@src/components/UI/CarouselNextButton';
import TopRatingCount from '@src/components/shared/TopRatingCount';
import { APP_PREFIX_PATH, PRICE_CURRENCY } from '@src/configs/AppConfig';
import WishlistIcon from '@src/assets/svg/WishlistIcon';
import ProductImage from '@src/assets/images/products/8.png';
import { useNavigate } from 'react-router-dom';
import { RouteKeysEnum } from '@src/configs/RoutesConfig';
import useNavigationList from '@src/hooks/useNavigationList';
import { QueriesKeysEnum } from '@src/configs/QueriesConfig';
import {
  fetchWishlist,
  removeItemFromWishlist
} from '@src/services/WishlistService';
import { useMutation, useQuery } from '@tanstack/react-query';
import { WishlistProductsType } from '@src/types/API/WishlistType';
import { addItemToCart } from '@src/services/CartService';
import { ReOrder, fetchOrders } from '@src/services/OrdersService';
import { OrderDetailsType } from '@src/types/API/OrdersType';

interface ProductItemProps {
  product: WishlistProductsType['items'][0];
  onAddToCart: (productId: string) => void;
  onRemoveItemWishlist: (productId: string) => void;
  onNavigateToProduct: (productId: string, templateId: string) => void;
}

const ProductItem = ({
  product,
  onAddToCart,
  onRemoveItemWishlist,
  onNavigateToProduct
}: ProductItemProps) => (
  <div
    className={`w-96 h-48 px-4 bg-white rounded-3xl shadow-md relative flex items-center justify-center gap-x-12`}
  >
    <img
      src={product.images[0]}
      alt='product'
      loading='lazy'
      className='w-28 h-32 object-contain drop-shadow-md'
    />
    <div className='flex flex-col gap-y-2 overflow-hidden'>
      <div>
        <h3 className='text-sm font-bold text-turkishRose'>
          {product.vendorName}
        </h3>
        <h1
          onClick={() =>
            onNavigateToProduct(product.id, product.productTemplate.id)
          }
          className='text-lg font-bold text-OuterSpace cursor-pointer truncate'
        >
          {product.name}
        </h1>
        <TopRatingCount />
      </div>
      <h4 className='font-bold text-lg text-OuterSpace flex gap-x-[0.625rem] items-center'>
        {PRICE_CURRENCY} {product.price}
        {product.mrpPrice && (
          <span className='font-semibold text-xs text-[#F41F52] line-through'>
            {PRICE_CURRENCY} {product.mrpPrice}
          </span>
        )}
      </h4>
      <button
        onClick={() => onAddToCart(product.id)}
        type='button'
        className='w-32 h-6 bg-turkishRose rounded-xl text-white text-xs font-medium flex justify-center items-center'
      >
        Add to cart
      </button>
    </div>
    <button
      type='button'
      title='add-to-wishlist'
      className='absolute right-5 top-5'
      onClick={() => onRemoveItemWishlist(product.id)}
    >
      <WishlistIcon className='w-4 h-4' />
    </button>
  </div>
);

interface ProductItemsProps {
  products: ProductItemProps['product'][];
  onAddToCart: ProductItemProps['onAddToCart'];
  onRemoveItemWishlist: ProductItemProps['onRemoveItemWishlist'];
}

const ProductItems = ({
  products,
  onAddToCart,
  onRemoveItemWishlist
}: ProductItemsProps) => {
  const carouselRef = useRef<CarouselRef>(null);

  const navigate = useNavigate();

  const onNavigateToProduct = (productId: string, templateId: string) => {
    navigate(
      `${APP_PREFIX_PATH}/${RouteKeysEnum.productDetails}/${templateId}/${productId}`
    );
  };

  const onNext = () => {
    if (carouselRef.current) {
      carouselRef.current.next();
    }
  };

  let responsive = [
    {
      breakpoint: 1426,
      settings: {
        slidesToShow: products.length >= 2 ? 2 : products.length
      }
    },
    {
      breakpoint: 596,
      settings: {
        slidesToShow: 1
      }
    }
  ];

  return (
    <div className='w-full max-w-7xl relative'>
      <Carousel
        ref={carouselRef}
        dots={false}
        className='w-full h-full relative'
        autoplay={true}
        autoplaySpeed={5000}
        slidesToShow={products.length >= 3 ? 3 : products.length}
        responsive={responsive}
      >
        {products.map((product) => (
          <ProductItem
            onNavigateToProduct={onNavigateToProduct}
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onRemoveItemWishlist={onRemoveItemWishlist || (() => {})}
          />
        ))}
      </Carousel>
      {products.length > 3 && (
        <CarouselNextButton
          onClick={onNext}
          className={`absolute top-1/2 -right-2 text-xs`}
        />
      )}
    </div>
  );
};

interface OrderProductProps {
  orderAgain: (orderId: string) => void;
  product: OrderDetailsType;
}

const OrderProduct = ({ orderAgain, product }: OrderProductProps) => (
  <div
    className={`w-96 h-48 px-4 bg-white rounded-3xl shadow-md relative flex items-center justify-center gap-x-12`}
  >
    <img
      src={product.items[0].images[0]}
      alt='product'
      loading='lazy'
      className='w-28 h-32 object-contain drop-shadow-md'
    />
    <div className='flex flex-col gap-y-2 overflow-hidden'>
      <div>
        <h3 className='text-sm font-bold text-turkishRose'>
          {product.orderNo}
        </h3>
        <h1 className='text-lg font-bold text-OuterSpace cursor-pointer truncate'>
          {product.userName}
        </h1>
      </div>
      <h4 className='font-bold text-lg text-OuterSpace flex gap-x-[0.625rem] items-center'>
        {PRICE_CURRENCY} {product.totalAmount}
        {product.discount && (
          <span className='font-semibold text-xs text-[#F41F52] line-through'>
            {PRICE_CURRENCY} {product.discount}
          </span>
        )}
      </h4>
      <button
        onClick={() => orderAgain(product.id)}
        type='button'
        className='w-32 h-6 bg-turkishRose rounded-xl text-white text-xs font-medium flex justify-center items-center'
      >
        Re-Order
      </button>
    </div>
  </div>
);

const OrdersItems = () => {
  const { data: ordersList, isFetching } = useQuery({
    queryKey: [QueriesKeysEnum.ORDERS],
    queryFn: async () =>
      fetchOrders(
        new URLSearchParams({
          status: 'Delivered'
        })
      ),
    initialData: []
  });

  const { mutateAsync: reorderMutation } = useMutation({
    mutationFn: async (data: { orderId: string }) => ReOrder(data.orderId)
  });

  const carouselRef = useRef<CarouselRef>(null);

  const onOrderAgain = async (orderId: string) => {
    try {
      message.loading('Processing...', 0);
      await reorderMutation({ orderId });
      message.success('Order placed successfully');
    } catch (error: any) {
      message.error("Couldn't process your request");
    } finally {
      setTimeout(() => {
        message.destroy();
      }, 1000);
    }
  };

  if (isFetching) {
    return <Spin className='!self-start !ml-40' />;
  }

  if (!ordersList?.length) {
    return (
      <Empty description='No recent orders found' className='w-fit ml-20' />
    );
  }

  const onNext = () => {
    if (carouselRef.current) {
      carouselRef.current.next();
    }
  };

  let responsive = [
    {
      breakpoint: 1426,
      settings: {
        slidesToShow: ordersList.length >= 2 ? 2 : ordersList.length
      }
    },
    {
      breakpoint: 596,
      settings: {
        slidesToShow: 1
      }
    }
  ];

  return (
    <div className='w-full max-w-7xl relative'>
      <Carousel
        ref={carouselRef}
        dots={false}
        className='w-full h-full relative'
        autoplay={true}
        autoplaySpeed={5000}
        slidesToShow={ordersList.length >= 3 ? 3 : ordersList.length}
        responsive={responsive}
      >
        {ordersList.map((product) => (
          <OrderProduct product={product} orderAgain={onOrderAgain} />
        ))}
      </Carousel>
      {ordersList.length > 3 && (
        <CarouselNextButton
          onClick={onNext}
          className={`absolute top-1/2 -right-2 text-xs`}
        />
      )}
    </div>
  );
};
const WishlistItems = ({
  onAddToCart,
  onRemoveItemWishlist
}: Omit<ProductItemsProps, 'products'>) => {
  const {
    data: wishlistProducts,
    isFetching,
    refetch
  } = useQuery({
    queryKey: [QueriesKeysEnum.WISH_LIST],
    queryFn: async () => fetchWishlist(),
    initialData: null
  });

  if (isFetching) {
    return <Spin className='!self-start !ml-40' />;
  }

  const onRemoveItem = async (productId: string) => {
    try {
      await onRemoveItemWishlist(productId);
      refetch();
    } catch (error) {
      // console.log('error', error);
    }
  };

  if (!wishlistProducts?.items?.length) {
    return (
      <Empty
        description='No products in your wishlist'
        className='w-fit ml-20'
      />
    );
  }

  return (
    <ProductItems
      products={wishlistProducts?.items || []}
      onAddToCart={onAddToCart}
      onRemoveItemWishlist={onRemoveItem}
    />
  );
};

const navItems = [
  {
    key: 'wishlist',
    label: 'Your Wishlist'
  },
  {
    key: 'orders',
    label: 'Order again'
  }
];

interface RelatedCartListingProps {
  refetchCart: () => void;
}

const RelatedCartListing = ({ refetchCart }: RelatedCartListingProps) => {
  const { NavigationComponent, activeItemKey } = useNavigationList({
    navItems: navItems
  });

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
      refetchCart();
    } catch (error: any) {
      if (error.response?.status === 409) {
        message.info('Item already in cart');
        return;
      }
      message.error("Couldn't add to cart");
    } finally {
      setTimeout(() => {
        message.destroy();
      }, 1000);
    }
  };
  const onRemoveItemWishlist = async (productId: string) => {
    try {
      await removeItemFromWishlistMutation({ productId });
    } catch (error: any) {
      message.error("Couldn't remove item");
    }
  };

  return (
    <div className='flex flex-col gap-y-7 w-11/12 min-h-[16rem]'>
      <NavigationComponent />
      {activeItemKey === 'wishlist' && (
        <WishlistItems
          onAddToCart={onAddToCart}
          onRemoveItemWishlist={onRemoveItemWishlist}
        />
      )}
      {activeItemKey === 'orders' && <OrdersItems />}
    </div>
  );
};

export default RelatedCartListing;
