import { PRICE_CURRENCY } from '@src/configs/AppConfig';
import { Divider } from 'antd';
import TopRatingCount from './TopRatingCount';
import ProductImage from '@src/assets/images/products/4.png';
import { calculateOffPercentage } from '@src/utils/CalculateOffPercentage';

interface ProductCardProps {
  name: string;
  price: number;
  image?: string;
  oldPrice?: number;
  rating?: number;
  reviews?: number;
  onClick?: () => void;
  className?: string;
}

const ProductCard = (props: ProductCardProps) => {
  const offPercentage = props.oldPrice
    ? calculateOffPercentage(props.oldPrice, props.price)
    : 0;

  return (
    <div
      className={`w-56 h-72 rounded-2xl border-2 border-[#EDEDED] bg-[#F5F5F5] 
     flex flex-col gap-y-4 justify-end items-center relative ${props.className}`}
    >
      <img
        className="w-24 h-28 object-scale-down"
        src={props.image || ProductImage}
        alt="Product"
        loading="lazy"
      />
      <div className="w-full h-28 bg-white text-[#222222] py-2 px-3 rounded-bl-2xl rounded-br-2xl flex flex-col justify-between">
        <h3 onClick={props.onClick} className="font-semibold cursor-pointer">
          {props.name}
        </h3>
        <h4 className="font-bold flex gap-x-[0.625rem]">
          {PRICE_CURRENCY} {props.price}
          {props.oldPrice && (
            <span className="font-normal line-through">
              {PRICE_CURRENCY} {props.oldPrice}
            </span>
          )}
        </h4>
        <Divider className="!m-0 w-full border-[#EDEDED] rounded" />
        <TopRatingCount
          rate={props.rating}
          reviews={props.reviews}
          className="text-sm"
        />
      </div>
      {offPercentage > 0 && (
        <div className="absolute bg-turkishRose w-12 h-14 rounded-tr-2xl rounded-bl-2xl top-0 right-0 flex">
          <p className="text-white font-semibold text-sm m-auto tracking-wide text-center">
            {offPercentage}% OFF
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
