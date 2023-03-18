import { APP_PREFIX_PATH, PRICE_CURRENCY } from '@src/configs/AppConfig';
import { Divider } from 'antd';
import TopRatingCount from './TopRatingCount';
import { calculateOffPercentage } from '@src/utils/CalculateOffPercentage';
import { useNavigate } from 'react-router-dom';
import { RouteKeysEnum } from '@src/configs/RoutesConfig';

export interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  templateId: string;
  image?: string;
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

  return (
    <div
      onClick={() =>
        navigate(
          `${APP_PREFIX_PATH}/${RouteKeysEnum.productDetails}/${
            props.templateId
          }/${props.variantId || props.id}`
        )
      }
      className={`w-56 h-72 rounded-2xl border-2 border-[#EDEDED] bg-[#F5F5F5] 
     flex flex-col gap-y-4 justify-end items-center relative  cursor-pointer ${props.className}`}
    >
      <img
        className='w-24 h-28 object-cover'
        src={props.image}
        alt='Product'
        loading='lazy'
      />
      <div className='w-full h-28 bg-white text-firebrick py-2 px-3 rounded-bl-2xl rounded-br-2xl flex flex-col justify-between'>
        <h3 className='font-semibold'>{props.name}</h3>
        <h4 className='font-bold flex gap-x-[0.625rem]'>
          {PRICE_CURRENCY} {props.price}
          {props.oldPrice && (
            <span className='font-normal line-through'>
              {PRICE_CURRENCY} {props.oldPrice}
            </span>
          )}
        </h4>
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
  );
};

export default ProductCard;
