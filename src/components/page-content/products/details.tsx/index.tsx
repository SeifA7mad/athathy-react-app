import { ProductTemplateType, ProductType } from '@src/types/API/ProductType';
import { Collapse, Divider, Image, Select, message, notification } from 'antd';
import { useState } from 'react';

import { HeartFilled } from '@ant-design/icons';
import { APP_PREFIX_PATH } from '@src/configs/AppConfig';
import { RouteKeysEnum } from '@src/configs/RoutesConfig';
import useNavigationList from '@src/hooks/useNavigationList';

import { Interweave } from 'interweave';
import { Link, useNavigate } from 'react-router-dom';
import useProductActions from '@src/hooks/useProductActions';
import Carousel from '@src/components/shared/Carousel';
import ProductReviewsSummary from '@src/components/shared/ProductReviewsSummary';
import ProductPriceDetails from '@src/components/shared/ProductPriceDetails';
import AthathyInputNumber from '@src/components/shared/AthathyInputNumber';
import HeartSvg from '@src/assets/svg/HeartSvg';
import ProductReviews from './ProductReviews';

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
    <div className='w-full flex flex-col lg:flex-row items-start gap-[2.5rem] min-h-[32.5rem]'>
      <Carousel
        className='w-[34.375rem]'
        images={productDetails.images}
        mainImgClassName='w-[550px] h-[550px] object-cover'
        previewImgClassName='w-[100px] h-[110px] object-cover'
      />

      <div className='flex flex-col gap-y-4 w-[49%]'>
        <div className='flex flex-col'>
          <h1 className='text-[1.625rem] font-bold text-OuterSpace'>
            {productDetails?.name} by {productDetails?.brand?.name}
          </h1>
          <ProductReviewsSummary
            overallRating={productDetails.review?.overallRating ?? 0}
            reviewsCount={productDetails.review?.total ?? 0}
          />
        </div>
        <ProductPriceDetails
          price={productDetails.price}
          oldPrice={productDetails.mrpPrice}
        />

        <p className='font-semibold text-whiteSmoke text-sm flex gap-2'>
          Delivered in{' '}
          <span className='text-OuterSpace font-bold'>4-7 days</span>
          <span>to</span>
          <span className='font-bold text-OuterSpace underline underline-offset-2'>
            Al Barsha 3
          </span>
        </p>

        {variantsSelection}

        {/* {!!productDetails?.variant && (
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
        )} */}

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

        {/* Cart Actions */}
        <div className='flex flex-col gap-4 w-full'>
          <div className='flex gap-3 items-center w-full'>
            <AthathyInputNumber
              value={selectedQuantity}
              setValue={setSelectedQuantity}
              name='quantity'
              max={productDetails.allowedQuantityPerOrder}
            />
            <button
              className={`flex items-center justify-center h-8 aspect-square border-2 border-black rounded-full`}
              onClick={() => onAddToWishlist(productDetails.id)}
            >
              {isAddedToWishlist ? (
                <HeartFilled className='text-red-600 text-xl' />
              ) : (
                <HeartSvg className='w-4 h-4' />
              )}
            </button>
            <button
              className={`${
                isAddedToCart ? 'bg-red-900' : 'bg-turkishRose'
              }  h-[3.125rem] text-white w-[26.1875rem] max-w-sm rounded-[75px] text-base font-medium`}
              onClick={() => onAddToCart(productDetails.id, selectedQuantity)}
            >
              {isAddedToCart ? 'Remove from Cart' : 'Add to cart'}
            </button>
          </div>
        </div>

        <Link
          to={`${APP_PREFIX_PATH}/${RouteKeysEnum.vendors}/${productDetails.userId}`}
          className='font-semibold text-xl text-[#9CA4AB]'
        >
          Sold by{' '}
          <span className='underline text-blue-500 underline-offset-4'>
            {productDetails.username}
          </span>
        </Link>

        <Divider className='border-2 my-[1rem]' />

        {/* Product Overview */}
        <div className='flex flex-col gap-2'>
          <h2 className='text-turkishRose font-bold text-lg'>
            Product Overview
          </h2>
          <div className='flex bg-[#f5f5f5] rounded-2xl w-[668px] h-[131px]'></div>
        </div>

        {/* Accordion */}
        <Collapse className='w-full' prefixCls='ant-collapse-product'>
          <Collapse.Panel key={'description'} header='Description'>
            <Interweave content={productDetails.description} />
          </Collapse.Panel>
          <Collapse.Panel key={'Specification'} header='Specification'>
            <Interweave content={productDetails.description} />
          </Collapse.Panel>
        </Collapse>
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
      <ProductReviews
        productId={productDetails.id}
        review={productDetails.review}
        vendorId={productDetails.userId}
      />
    </div>
  );
};

interface ProductDetailsItemProps {
  product: ProductType;
  variants: ProductTemplateType['variants'];
}

const ProductDetailsItem = ({ product, variants }: ProductDetailsItemProps) => {
  const navigate = useNavigate();

  const { isAddedToCart, onAddToCart, onAddToWishlist, isAddedToWishlist } =
    useProductActions({
      productId: product.id
    });

  let VariantsSelection = undefined;

  if (variants?.length) {
    VariantsSelection = (
      // <Select
      //   value={product.variant?.id}
      //   onChange={(val) =>
      //     navigate(
      //       `${APP_PREFIX_PATH}/${RouteKeysEnum.productDetails}/${product.productTemplateId}/${val}`
      //     )
      //   }
      // >
      //   {variants.map((variant) => (
      //     <Select.Option key={variant.id} value={variant.id}>
      //       {variant.name}
      //     </Select.Option>
      //   ))}
      // </Select>
      <div className='flex gap-2'>
        {variants.map((variant) => (
          <button
            type='button'
            key={variant.id}
            onClick={() =>
              navigate(
                `${APP_PREFIX_PATH}/${RouteKeysEnum.productDetails}/${product.productTemplateId}/${variant.id}`
              )
            }
            className={`rounded-[6.25rem] text-OuterSpace bg-sauvignon py-[0.625rem] px-[1.25rem] ${
              product.variant?.id === variant.id
                ? 'bg-turkishRose text-white'
                : ''
            }`}
          >
            {variant.name}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className='w-full flex flex-col gap-y-2 py-12 m-auto lg:m-0'>
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
