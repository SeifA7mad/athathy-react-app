import { ProductType } from '@src/types/API/ProductType';
import { useState } from 'react';
import { Divider, Image, message, Spin } from 'antd';
import TopRatingCount from '@src/components/shared/TopRatingCount';
import { useMutation, useQuery } from '@tanstack/react-query';
import { QueriesKeysEnum } from '@src/configs/QueriesConfig';
import { fetchProduct } from '@src/services/ProductService';

import { HeartOutlined } from '@ant-design/icons';
import { PRICE_CURRENCY } from '@src/configs/AppConfig';
import { addItemToCart } from '@src/services/CartService';
import { addItemToWishlist } from '@src/services/WishlistService';

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
  onAddToCart: (productId: string, quantity: number) => void;
  onAddToWishlist: (productId: string) => void;
}
const MainProductDetails = ({
  productDetails,
  onAddToCart,
  onAddToWishlist
}: MainProductDetailsProps) => {
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
              <HeartOutlined className='hover:!text-[#D72121] transition-all' />
            </span>
          </div>
          <TopRatingCount />
        </div>
        <div className='flex gap-x-6 items-center'>
          <div className='flex flex-col gap-y-4 font-medium text-whiteSmoke'>
            {productDetails?.mrpPrice && <p>Was:</p>}
            <p>Now:</p>
            {productDetails?.mrpPrice && <p>Saving:</p>}
          </div>
          <div className='flex flex-col gap-y-4 font-medium text-whiteSmoke'>
            {productDetails?.mrpPrice && (
              <p className='font-medium text-[#D72121] line-through'>
                {PRICE_CURRENCY} {productDetails.mrpPrice}
              </p>
            )}
            <p className='text-2xl font-semibold text-OuterSpace flex items-center gap-x-2'>
              {PRICE_CURRENCY} {productDetails.price}{' '}
              <span className='font-medium text-base text-whiteSmoke'>
                (Inclusive of Vat)
              </span>
            </p>
            {productDetails?.mrpPrice && (
              <p className='font-medium text-[#30B700]'>
                {PRICE_CURRENCY}{' '}
                {productDetails?.mrpPrice - productDetails.price}
              </p>
            )}
          </div>
        </div>
        <p className='font-bold text-OuterSpace'>
          Dimension{' '}
          <span className='font-medium text-whiteSmoke'>
            {' '}
            {productDetails?.shippingDetail.length} x{' '}
            {productDetails?.shippingDetail.width} x{' '}
            {productDetails?.shippingDetail.height}{' '}
          </span>
        </p>
      </div>
    </div>
  );
};

interface ProductDetailsItemProps {
  productId: string;
}

const ProductDetailsItem = ({ productId }: ProductDetailsItemProps) => {
  const { data: productDetails, isFetching } = useQuery({
    queryKey: [QueriesKeysEnum.PRODUCTS, productId],
    queryFn: async () => fetchProduct(productId),
    initialData: null
  });

  const { mutateAsync: onAddToCartMutation } = useMutation({
    mutationFn: async (data: { productId: string; quantity: number }) =>
      addItemToCart(data)
  });

  const { mutateAsync: onAddToWishlistMutation } = useMutation({
    mutationFn: async (data: { productId: string }) => addItemToWishlist(data)
  });

  const onAddToCart = async (productId: string, quantity: number) => {
    try {
      await onAddToCartMutation({ productId, quantity });
      message.success('Added to cart');
    } catch (error) {
      message.error("Couldn't add to cart");
    }
  };

  const onAddToWishlist = async (productId: string) => {
    try {
      await onAddToWishlistMutation({ productId });
      message.success('Added to wishlist');
    } catch (error) {
      message.error("Couldn't add to wishlist");
    }
  };

  if (isFetching) return <Spin />;

  return (
    <div className='w-full lg:w-11/12 flex flex-col gap-y-16 m-auto lg:m-0'>
      {productDetails && (
        <MainProductDetails
          onAddToCart={onAddToCart}
          onAddToWishlist={onAddToWishlist}
          productDetails={productDetails}
        />
      )}
    </div>
  );
};

export default ProductDetailsItem;
