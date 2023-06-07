import { APP_PREFIX_PATH, PRICE_CURRENCY } from '@src/configs/AppConfig';
import { Divider } from 'antd';
import TopRatingCount from './TopRatingCount';
import { calculateOffPercentage } from '@src/utils/CalculateOffPercentage';
import { useNavigate } from 'react-router-dom';
import { RouteKeysEnum } from '@src/configs/RoutesConfig';
import { useState } from 'react';
import ProductQuickViewModal from '../modals/ProductQuickViewModal';

export interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  templateId: string;
  brandName: string;
  image?: string;
  images?: string[];
  oldPrice?: number;
  rating?: number;
  reviews?: number;
  className?: string;
  variantId?: string;
}

const ProductCard = (props: ProductCardProps) => {
  const navigate = useNavigate();
  const offPercentage = props.oldPrice
    ? calculateOffPercentage(props.oldPrice, props.price)
    : 0;

  const [showQuickView, setShowQuickView] = useState(false);
  const { ModalComponent, toggleModal } = ProductQuickViewModal(props.id);

  return (
    <>
      <div
        className={`w-[14.375rem] h-[21.75rem] rounded-2xl bg-white
     flex flex-col items-center relative !cursor-pointer overflow-hidden ${props.className}`}
      >
        <div
          className='relative w-full h-[14.375rem]'
          onPointerEnter={() => {
            setShowQuickView(true);
          }}
          onPointerLeave={() => {
            setShowQuickView(false);
          }}
        >
          <img
            className='object-cover w-full h-full'
            src={props.image}
            alt='Product'
            loading='lazy'
          />
          {showQuickView && (
            <div
              className='absolute flex items-center justify-center hover:backdrop-blur-sm top-0 bg-black/20 z-20 w-full h-full'
              onClick={() =>
                navigate(
                  `${APP_PREFIX_PATH}/${RouteKeysEnum.productDetails}/${
                    props.templateId
                  }/${props.variantId || props.id}`
                )
              }
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleModal(true);
                }}
                className='flex items-center justify-center rounded-[2.125rem] font-semibold bg-white w-[6.9375rem] h-[2.5rem] z-30 text-turkishRose border-turkishRose border'
              >
                Quick View
              </button>
            </div>
          )}
        </div>

        <div
          className='w-full flex-1 bg-white text-firebrick py-[.625rem] px-[1.25rem] flex flex-col'
          onClick={() =>
            navigate(
              `${APP_PREFIX_PATH}/${RouteKeysEnum.productDetails}/${
                props.templateId
              }/${props.variantId || props.id}`
            )
          }
        >
          <div className='flex flex-col justify-between'>
            <h3 className='text-turkishRose text-[.6875rem] leading-[.8662rem] font-semibold'>
              {props.brandName?.toUpperCase()}
            </h3>
            <span className='flex items-center h-[2.5rem]'>
              <h3 className='truncate-text-2-lines font-bold text-base leading-[1.26rem] text-OuterSpace'>
                {props.name}
              </h3>
            </span>
            <h4 className='font-semibold text-[#222222] mt-[.3125rem] flex gap-x-[0.625rem] text-sm leading-[1.125rem]'>
              {PRICE_CURRENCY} {props.price}
              {props.oldPrice && (
                <span className='text-[#F41F52] font-normal line-through leading-[1.125rem]'>
                  {PRICE_CURRENCY} {props.oldPrice}
                </span>
              )}
            </h4>
          </div>
          <TopRatingCount
            rate={props.rating}
            reviews={props.reviews}
            className='text-sm justify-self-end my-auto'
          />
        </div>
        {offPercentage > 0 && (
          <div className='absolute bg-turkishRose w-[3.125rem] h-[3.125rem] rounded-bl-2xl top-0 right-0 flex'>
            <p className='text-white font-semibold text-sm m-auto tracking-wide text-center'>
              {offPercentage}% <br /> OFF
            </p>
          </div>
        )}
      </div>
      <ModalComponent />
    </>
  );
};

export default ProductCard;
