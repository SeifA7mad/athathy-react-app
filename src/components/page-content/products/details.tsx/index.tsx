import { ProductType } from '@src/types/API/ProductType';
import { useMemo, useState } from 'react';
import { Divider, Image, message, Spin } from 'antd';
import TopRatingCount from '@src/components/shared/TopRatingCount';
import { useMutation, useQuery } from '@tanstack/react-query';
import { QueriesKeysEnum } from '@src/configs/QueriesConfig';
import { fetchProduct } from '@src/services/ProductService';

import { HeartOutlined } from '@ant-design/icons';
import { PRICE_CURRENCY } from '@src/configs/AppConfig';
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
import useNavigationList from '@src/hooks/useNavigationList';
import { Interweave } from 'interweave';

interface ProductImagesThumbnailsProps {
  images: string[];
}

const ProductImagesThumbnails = ({ images }: ProductImagesThumbnailsProps) => {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className='flex flex-col-reverse lg:flex-row gap-6 h-full'>
      <ul className='flex w-full lg:h-full lg:w-auto justify-center lg:justify-start flex-row lg:flex-col gap-8'>
        {images.map((image, index) => (
          <li
            key={index}
            onClick={() => setActiveImage(index)}
            className='w-24 h-28 bg-white rounded-2xl flex justify-center items-center cursor-pointer hover:scale-110 !transition-all'
          >
            <Image
              src={image}
              alt='Product'
              className='!w-14 !h-16 !object-cover'
              loading='lazy'
            />
          </li>
        ))}
      </ul>
      <div className='w-full lg:w-[29rem] h-full bg-white rounded-2xl flex justify-center items-center'>
        <Image
          src={images[activeImage]}
          alt='product'
          className='!w-[21rem] !h-[25rem] !object-cover'
          loading='lazy'
        />
      </div>
    </div>
  );
};

interface MainProductDetailsProps {
  productDetails: ProductType;
  isAddedToCart: boolean;
  isAddedToWishlist: boolean;
  onAddToCart: (productId: string, quantity: number) => void;
  onAddToWishlist: (productId: string) => void;
}
const MainProductDetails = ({
  productDetails,
  onAddToCart,
  onAddToWishlist,
  isAddedToCart,
  isAddedToWishlist
}: MainProductDetailsProps) => {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  return (
    <div className='w-full lg:h-[32.5rem] flex flex-col lg:flex-row gap-11'>
      <ProductImagesThumbnails images={productDetails.images} />
      <Divider
        type='vertical'
        className='border-[#A0A8AE] !h-[90%] !m-0 !my-auto'
      />

      <div className='flex flex-col gap-y-6'>
        <div className='flex flex-col gap-y-2'>
          <h3 className='font-semibold text-2xl text-whiteSmoke'>
            {productDetails.brand.name}
          </h3>
          <div className='flex gap-x-20 items-center'>
            <h1 className='text-4xl font-bold text-OuterSpace'>
              {productDetails.name}
            </h1>
            <span
              onClick={() => onAddToWishlist(productDetails.id)}
              className='bg-white   w-11 h-11 rounded-full flex justify-center items-center cursor-pointer'
            >
              <HeartOutlined
                className={`hover:!text-[#D72121] transition-all ${
                  isAddedToWishlist && '!text-[#D72121]'
                }`}
              />
            </span>
          </div>
          <TopRatingCount />
        </div>
        <div className='flex flex-col gap-y-4 font-medium text-whiteSmoke'>
          {productDetails?.mrpPrice && (
            <div className='flex gap-x-6 items-center'>
              <p className='w-14'>Was:</p>
              <p className='font-medium text-[#D72121] line-through'>
                {PRICE_CURRENCY} {productDetails.mrpPrice}
              </p>
            </div>
          )}
          <div className='flex gap-x-6 items-center'>
            <p className='w-14'>Now:</p>
            <p className='text-2xl font-semibold text-OuterSpace flex items-center gap-x-2'>
              {PRICE_CURRENCY} {productDetails.price}{' '}
              <span className='font-medium text-base text-whiteSmoke'>
                (Inclusive of Vat)
              </span>
            </p>
          </div>
          {productDetails?.mrpPrice && (
            <div className='flex gap-x-6 items-center'>
              <p className='w-14'>Saving:</p>{' '}
              <p className='font-medium text-[#30B700]'>
                {PRICE_CURRENCY}{' '}
                {productDetails?.mrpPrice - productDetails.price}
              </p>
            </div>
          )}
        </div>
        {productDetails?.shippingDetail && (
          <p className='font-bold text-OuterSpace'>
            Dimension{' '}
            <span className='font-medium text-whiteSmoke'>
              {' '}
              {productDetails?.shippingDetail?.length} x{' '}
              {productDetails?.shippingDetail?.width} x{' '}
              {productDetails?.shippingDetail?.height}{' '}
            </span>
          </p>
        )}
        <div className='flex gap-x-8 items-end'>
          <div className='flex flex-col gap-y-3'>
            <p className='font-semibold text-OuterSpace'>Quantity</p>
            <select
              title='quantity'
              defaultValue={1}
              onChange={(e) => setSelectedQuantity(Number(e.target.value))}
              className='bg-white h-14 w-16 px-3  text-OuterSpace font-medium cursor-pointer'
            >
              {[...Array(productDetails.allowedQuantityPerOrder || 10)].map(
                (_, index) => (
                  <option key={index} value={index + 1}>
                    {index + 1}
                  </option>
                )
              )}
            </select>
          </div>
          <button
            type='button'
            onClick={() => onAddToCart(productDetails.id, selectedQuantity)}
            className='h-14 w-60 bg-turkishRose text-white rounded-sm font-medium hover:opacity-80'
          >
            {isAddedToCart ? 'Added to cart' : 'Add to cart'}
          </button>
        </div>
        <h4 className='font-semibold text-2xl text-[#9CA4AB]'>
          Sold by{' '}
          <span className='underline underline-offset-4'>
            {productDetails.brand.name}
          </span>
        </h4>
        <p className='font-semibold text-whiteSmoke'>
          Delivery by{' '}
          <span className='text-[#30B700] font-medium'>
            {' '}
            22nd February 2023
          </span>{' '}
          <br />{' '}
          <span className='font-bold text-OuterSpace underline underline-offset-2'>
            Al Barsha 3
          </span>
        </p>
      </div>
    </div>
  );
};

const navItems = [
  {
    key: 'overview',
    label: 'Overview'
  },
  {
    key: 'specification',
    label: 'Specification'
  }
];

interface SubProductDetailsProps {
  productDetails: ProductType;
}

const SubProductDetails = ({ productDetails }: SubProductDetailsProps) => {
  const { NavigationComponent, activeItemKey } = useNavigationList({
    navItems: navItems
  });

  return (
    <div className='flex flex-col gap-y-4'>
      <NavigationComponent />
      {activeItemKey === 'overview' && (
        <Interweave content={productDetails.description} />
      )}
    </div>
  );
};

interface ProductDetailsItemProps {
  product: ProductType;
}

const ProductDetailsItem = ({ product }: ProductDetailsItemProps) => {
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
    initialData: null
  });

  const isAddedToCart = useMemo(
    () =>
      cartProducts?.items.some(
        (cartItem) => product.id === cartItem.product.id
      ),
    [cartProducts, product]
  );

  const { data: wishlistProducts, refetch: refetchWishList } = useQuery({
    queryKey: [QueriesKeysEnum.WISH_LIST],
    queryFn: async () => fetchWishlist(),
    initialData: null
  });

  const isAddedToWishlist = useMemo(
    () =>
      wishlistProducts?.items.some(
        (wishlistItem) =>
          product.productTemplateId === wishlistItem.productTemplate.id
      ),
    [wishlistProducts, product]
  );

  const onAddToCart = async (productId: string, quantity: number) => {
    if (isAddedToCart) {
      message.loading('Removing from cart', 0);
      await removeItemFromCartMutation({ productId });
    } else {
      try {
        message.loading('Adding to cart', 0);
        await onAddToCartMutation({ productId, quantity });
        message.success('Added to cart');
      } catch (error: any) {
        if (error.response?.status === 409) {
          message.info('Item already in cart');
          return;
        }
        message.error("Couldn't add to cart");
      }
    }
    setTimeout(() => {
      message.destroy();
    }, 1000);
    refetchCart();
  };

  const onAddToWishlist = async (productId: string) => {
    if (isAddedToWishlist) {
      message.loading('Removing from wishlist', 0);
      await removeItemFromWishlistMutation({ productId });
    } else {
      try {
        message.loading('Adding to wishlist', 0);
        await onAddToWishlistMutation({ productId });

        message.success('Added to wishlist');
      } catch (error: any) {
        if (error.response?.status === 409) {
          message.info('Item already in wishlist');
          return;
        }
        message.error("Couldn't add to wishlist");
      }
    }
    setTimeout(() => {
      message.destroy();
    }, 1000);
    refetchWishList();
  };

  return (
    <div className='w-full lg:w-11/12 flex flex-col gap-y-16 m-auto lg:m-0'>
      {product && (
        <MainProductDetails
          isAddedToCart={isAddedToCart || false}
          isAddedToWishlist={isAddedToWishlist || false}
          onAddToCart={onAddToCart}
          onAddToWishlist={onAddToWishlist}
          productDetails={product}
        />
      )}
      {product && <SubProductDetails productDetails={product} />}
    </div>
  );
};

export default ProductDetailsItem;
