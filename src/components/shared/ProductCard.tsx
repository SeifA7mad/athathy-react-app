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
        className={`w-[13.75rem] h-[17.5rem] rounded-2xl border-2 border-[#EDEDED] bg-white
     flex flex-col items-center relative !cursor-pointer ${props.className} overflow-hidden`}
      >
        <div
          className='relative w-full h-44'
          onPointerEnter={() => {
            setShowQuickView(true);
          }}
          onPointerLeave={() => {
            setShowQuickView(false);
          }}
        >
          <img
            className='object-cover w-full h-44'
            src={props.image}
            alt='Product'
            loading='lazy'
          />
          {showQuickView && (
            <div className='absolute flex items-center justify-center hover:backdrop-blur-sm top-0 bg-black/20 z-20 w-full h-full'>
              <button
                onClick={() => toggleModal(true)}
                className='rounded-2xl bg-white py-1 px-3 text-turkishRose border-turkishRose border-2'
              >
                Quick View
              </button>
            </div>
          )}
        </div>

        <div className='w-full flex-1 bg-white text-firebrick py-2 px-3 rounded-bl-2xl rounded-br-2xl flex flex-col justify-between'>
          <div
            className='flex flex-col gap-1'
            onClick={() =>
              navigate(
                `${APP_PREFIX_PATH}/${RouteKeysEnum.productDetails}/${
                  props.templateId
                }/${props.variantId || props.id}`
              )
            }
          >
            <h3 className='text-turkishRose text-[0.688rem] font-semibold'>
              {props.brandName?.toUpperCase()}
            </h3>
            <h3 className='font-bold text-base truncate text-OuterSpace'>
              {props.name}
            </h3>
            <h4 className='font-semibold text-[#222222] flex gap-x-[0.625rem] text-sm'>
              {PRICE_CURRENCY} {props.price}
              {props.oldPrice && (
                <span className='text-[#F41F52] font-normal line-through'>
                  {PRICE_CURRENCY} {props.oldPrice}
                </span>
              )}
            </h4>
          </div>
          <Divider className='!m-0 w-full border-[#EDEDED] rounded' />
          <TopRatingCount
            rate={props.rating}
            reviews={props.reviews}
            className='text-sm'
          />
        </div>
        {offPercentage > 0 && (
          <div className='absolute bg-turkishRose w-12 h-14 rounded-tr-2xl rounded-bl-2xl top-0 right-0 flex'>
            <p className='text-white font-semibold text-sm m-auto tracking-wide text-center'>
              {offPercentage}% OFF
            </p>
          </div>
        )}
      </div>
      <ModalComponent />
    </>
  );
};

export default ProductCard;
