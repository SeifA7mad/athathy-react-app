import TopRatingCount from '@src/components/shared/TopRatingCount';
import { QueriesKeysEnum } from '@src/configs/QueriesConfig';
import { ProductTemplateType, ProductType } from '@src/types/API/ProductType';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Divider, Image, Select, message, notification } from 'antd';
import { useMemo, useState } from 'react';

import { HeartOutlined } from '@ant-design/icons';
import {
  APP_PREFIX_PATH,
  PRICE_CURRENCY,
  UNAUTHENTICATED_ENTRY
} from '@src/configs/AppConfig';
import { RouteKeysEnum } from '@src/configs/RoutesConfig';
import { useAppSelector } from '@src/hooks/redux-hook';
import useNavigationList from '@src/hooks/useNavigationList';
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
import { Interweave } from 'interweave';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import CustomerReviews from './CustomerReviews';
import SellerDetails from './SellerDetails';

interface ProductImagesThumbnailsProps {
  images: string[];
}

const ProductImagesThumbnails = ({ images }: ProductImagesThumbnailsProps) => {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className='flex flex-col-reverse lg:flex-row gap-6 h-[32.5rem]'>
      <ul className='flex w-full lg:h-full lg:w-auto justify-center lg:justify-start flex-row lg:flex-col gap-8'>
        {images.map((image, index) => (
          <li
            key={index}
            onClick={() => setActiveImage(index)}
            className='w-24 h-28 bg-white rounded-2xl flex justify-center items-center cursor-pointer hover:scale-110 !transition-all'
          >
            <img
              src={image}
              alt='Product'
              className='!w-14 !h-16 !object-contain'
              loading='lazy'
            />
          </li>
        ))}
      </ul>
      <div className='w-full lg:w-[29rem] h-full bg-white rounded-2xl flex justify-center items-center'>
        <Image
          src={images[activeImage]}
          alt='product'
          className='!w-[21rem] !h-[25rem] !object-contain'
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
  variantsSelection?: JSX.Element;
}
const MainProductDetails = ({
  productDetails,
  onAddToCart,
  onAddToWishlist,
  isAddedToCart,
  isAddedToWishlist,
  variantsSelection
}: MainProductDetailsProps) => {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  return (
    <div className='w-full flex flex-col lg:flex-row gap-11 min-h-[32.5rem]'>
      <ProductImagesThumbnails images={productDetails.images} />
      <Divider
        type='vertical'
        className='border-[#A0A8AE] !h-[90%] !m-0 !my-auto'
      />

      <div className='flex flex-col gap-y-3'>
        <div className='flex flex-col gap-y-2'>
          <h3 className='font-semibold text-2xl text-whiteSmoke'>
            {productDetails?.brand.name}
          </h3>

          <h1 className='text-4xl font-bold text-OuterSpace'>
            {productDetails.name}
          </h1>

          <TopRatingCount
            rate={productDetails?.review?.overallRating}
            reviews={productDetails?.review?.total}
          />
        </div>
        <div className='flex flex-col gap-y-2 font-medium text-whiteSmoke'>
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
        {variantsSelection}
        {!!productDetails?.variant && (
          <div className='grid gap-x-3 gap-y-4 max-w-xs md:max-w-none grid-cols-3'>
            {productDetails?.variant?.attributes.map((att, index) => (
              <div key={att.id} className='flex flex-col gap-y-2'>
                <h5 className='font-bold text-base text-OuterSpace'>
                  {att.name}
                </h5>
                <p className='font-medium text-sm text-OuterSpace'>
                  {att.value.value}
                </p>
              </div>
            ))}
          </div>
        )}
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
            {isAddedToCart ? 'Added to cart!' : 'Add to cart'}
          </button>
          <span
            onClick={() => onAddToWishlist(productDetails.id)}
            className={`bg-white  w-11 h-11 rounded-full flex justify-center items-center cursor-pointer ${
              isAddedToWishlist && '!bg-[#D72121]'
            }`}
          >
            <HeartOutlined
              className={`${
                !isAddedToWishlist && 'hover:!text-[#D72121]'
              } transition-all ${isAddedToWishlist && '!text-white'}`}
            />
          </span>
        </div>
        <p className='font-semibold text-whiteSmoke'>
          Delivery by{' '}
          <span className='text-[#30B700] font-medium'>5 - 7 days </span> <br />{' '}
          <span className='font-bold text-OuterSpace underline underline-offset-2'>
            Al Barsha 3
          </span>
        </p>
        <Link
          to={'seller-review'}
          className='font-semibold text-2xl text-[#9CA4AB]'
        >
          Sold by{' '}
          <span className='underline underline-offset-4'>
            {productDetails.username}
          </span>
        </Link>
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
  },
  {
    key: 'CustomerReviews',
    label: 'Customer reviews'
  },
  {
    key: 'Seller',
    label: 'Seller'
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
      {activeItemKey === 'CustomerReviews' && (
        <CustomerReviews
          productId={productDetails.id}
          review={productDetails.review}
        />
      )}
      {activeItemKey === 'Seller' && (
        <SellerDetails vendorId={productDetails.userId} />
      )}
    </div>
  );
};

interface ProductDetailsItemProps {
  product: ProductType;
  variants: ProductTemplateType['variants'];
}

const ProductDetailsItem = ({ product, variants }: ProductDetailsItemProps) => {
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
    enabled: isLoggedIn
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
    initialData: null,
    enabled: isLoggedIn
  });

  const isAddedToWishlist = useMemo(
    () =>
      wishlistProducts?.items.some(
        (wishlistItem) => product.id === wishlistItem.id
      ),
    [wishlistProducts, product]
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

  let VariantsSelection = undefined;

  if (variants?.length) {
    VariantsSelection = (
      <Select
        value={product.variant?.id}
        onChange={(val) =>
          navigate(
            `${APP_PREFIX_PATH}/${RouteKeysEnum.productDetails}/${product.productTemplateId}/${val}`
          )
        }
      >
        {variants.map((variant) => (
          <Select.Option key={variant.id} value={variant.id}>
            {variant.displayName}
          </Select.Option>
        ))}
      </Select>
    );
  }

  return (
    <div className='w-full flex flex-col gap-y-16 m-auto lg:m-0'>
      {product && (
        <MainProductDetails
          isAddedToCart={isAddedToCart || false}
          isAddedToWishlist={isAddedToWishlist || false}
          onAddToCart={onAddToCart}
          onAddToWishlist={onAddToWishlist}
          productDetails={product}
          variantsSelection={VariantsSelection}
        />
      )}
      {product && <SubProductDetails productDetails={product} />}
    </div>
  );
};

export default ProductDetailsItem;
