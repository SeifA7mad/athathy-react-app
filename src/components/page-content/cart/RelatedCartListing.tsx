import { useState, useRef } from 'react';
import { Carousel, message, Spin } from 'antd';
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
import { fetchWishlist } from '@src/services/WishlistService';
import { useMutation, useQuery } from '@tanstack/react-query';
import { WishlistProductsType } from '@src/types/API/WishlistType';
import { addItemToCart } from '@src/services/CartService';

interface ProductItemProps {
  product: WishlistProductsType['items'][0];
  onAddToCart: (productId: string) => void;
  onAddToWishlist: (productId: string) => void;
  onNavigateToProduct: (productId: string) => void;
}

const ProductItem = ({
  product,
  onAddToCart,
  onAddToWishlist,
  onNavigateToProduct
}: ProductItemProps) => (
  <div
    className={`w-96 h-48 bg-white rounded-3xl shadow-md relative flex items-center justify-center gap-x-12`}
  >
    <img
      src={product.images[0]}
      alt='product'
      loading='lazy'
      className='w-28 h-32 object-cover drop-shadow-md'
    />
    <div className='flex flex-col gap-y-2'>
      <div>
        <h3 className='text-sm font-bold text-turkishRose'>
          {product.vendorName}
        </h3>
        <h1
          onClick={() => onNavigateToProduct(product.id)}
          className='text-lg font-bold text-OuterSpace cursor-pointer'
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
        className='w-full h-6 bg-turkishRose rounded-xl text-white text-xs font-medium flex justify-center items-center'
      >
        Add to cart
      </button>
    </div>
    <button
      type='button'
      title='add-to-wishlist'
      className='absolute right-5 top-5'
      onClick={() => onAddToWishlist(product.id)}
    >
      <WishlistIcon className='w-4 h-4' />
    </button>
  </div>
);

interface ProductItemsProps {
  products: ProductItemProps['product'][];
  onAddToCart: ProductItemProps['onAddToCart'];
  onAddToWishlist?: ProductItemProps['onAddToWishlist'];
}

const ProductItems = ({
  products,
  onAddToCart,
  onAddToWishlist
}: ProductItemsProps) => {
  const carouselRef = useRef<CarouselRef>(null);

  const navigate = useNavigate();

  const onNavigateToProduct = (productId: string) => {
    navigate(`${APP_PREFIX_PATH}/${RouteKeysEnum.productDetails}/${productId}`);
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
        prefixCls='w-full h-full relative'
        className='w-full h-full'
        autoplay={true}
        autoplaySpeed={5000}
        slidesToShow={products.length < 3 ? products.length : 3}
        responsive={responsive}
      >
        {products.map((product) => (
          <ProductItem
            onNavigateToProduct={onNavigateToProduct}
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onAddToWishlist={onAddToWishlist || (() => {})}
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

const OrdersItems = () => {
  // TODO: Fetch Orders items from API
};
const WishlistItems = ({
  onAddToCart
}: Omit<ProductItemsProps, 'products'>) => {
  const { data: wishlistProducts, isFetching } = useQuery({
    queryKey: [QueriesKeysEnum.WISH_LIST],
    queryFn: async () => fetchWishlist(),
    initialData: null
  });

  if (isFetching) {
    return <Spin className='!self-start !ml-40' />;
  }

  return (
    <ProductItems
      products={wishlistProducts?.items || []}
      onAddToCart={onAddToCart}
    />
  );
};

const navItems = [
  {
    key: 'wishlist',
    label: 'Your Wish list'
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
  const onAddToWishlist = (productId: string) => {};

  return (
    <div className='flex flex-col gap-y-7 w-11/12 min-h-[16rem]'>
      <NavigationComponent />
      {activeItemKey === 'wishlist' && (
        <WishlistItems
          onAddToCart={onAddToCart}
          onAddToWishlist={onAddToWishlist}
        />
      )}
    </div>
  );
};

export default RelatedCartListing;
