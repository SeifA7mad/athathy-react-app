import { useRef } from 'react';

import { Carousel, Divider } from 'antd';
import ProductImage from '@src/assets/images/products/1.png';
import { StarFilled, RightOutlined } from '@ant-design/icons';
import { CarouselRef } from 'antd/es/carousel';
import { Link } from 'react-router-dom';
import ViewAllLink from '@src/components/UI/ViewAllLink';

interface DealsOfWeekProductItemProps {
  productName: string;
  productPrice: number;
  productOldPrice?: number;
  productImage: string;
  rate?: number;
  rateCount?: number;
  offPercentage?: number;
}

const PRICE_CURRENCY = 'AED';

const DealsOfWeekProductItem = (props: DealsOfWeekProductItemProps) => (
  <div className="relative w-80 m-auto">
    <div className="m-auto w-80 h-40 mt-5 bg-white rounded-3xl flex justify-between items-center px-5 overflow-hidden ">
      <div className="flex flex-col gap-y-2 w-1/2">
        <h1 className="font-bold text-sm text-OuterSpace">
          {props.productName}
        </h1>
        <h2 className="font-bold text-base text-OuterSpace flex items-center gap-x-2">
          {PRICE_CURRENCY} {props.productPrice}{' '}
          {props.productOldPrice && (
            <span className="text-xs text-[#F41F52] font-semibold line-through">
              {PRICE_CURRENCY} {props.productOldPrice}
            </span>
          )}
        </h2>
        <Divider className="!m-0 border-sauvignon rounded" />
        <p className="text-xs font-semibold text-[#FFCD1A] flex items-center gap-x-1">
          <StarFilled className="!leading-3" />
          <span>
            {props.rate}{' '}
            <span className="text-[#9CA4AB]">({props.rateCount})</span>
          </span>
        </p>
      </div>

      <img
        className="w-32 h-44 object-scale-down absolute -top-8 right-4"
        src={props.productImage}
        alt="Product"
        loading="lazy"
      />

      {props.offPercentage && (
        <div className="absolute bg-turkishRose w-20 h-8 rounded-tl-3xl rounded-br-2xl top-0 left-0 flex">
          <p className="text-white font-semibold text-xs m-auto tracking-wide">
            {props.offPercentage}% OFF
          </p>
        </div>
      )}
    </div>
  </div>
);

const DealsOfWeekList = () => {
  const carouselRef = useRef<CarouselRef>(null);

  const onNext = () => {
    if (carouselRef.current) {
      carouselRef.current.next();
    }
  };

  const onPrev = () => {
    if (carouselRef.current) {
      carouselRef.current.prev();
    }
  };

  let responsive = [
    {
      breakpoint: 1447,
      settings: {
        slidesToShow: 3
      }
    },
    {
      breakpoint: 1079,
      settings: {
        slidesToShow: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1
      }
    }
  ];

  return (
    <div className="w-full relative flex flex-col gap-y-6 place-items-center">
      <Carousel
        ref={carouselRef}
        dots={false}
        prefixCls="w-full h-full relative"
        className="w-full h-full"
        autoplay={true}
        autoplaySpeed={5000}
        slidesToShow={4}
        responsive={responsive}
      >
        {[...Array(10)].map((_, index) => (
          <DealsOfWeekProductItem
            key={index}
            productName="Chesterfield 1 Seater"
            productPrice={87}
            productOldPrice={99}
            productImage={ProductImage}
            rate={4}
            rateCount={100}
            offPercentage={20}
          />
        ))}
      </Carousel>
      <ViewAllLink to="" />
      <button
        className={`hidden w-8 h-8 rounded-full border border-turkishRose
         bg-white lg:flex justify-center items-center absolute bottom-20 right-0 text-xs`}
        onClick={onNext}
        type="button"
      >
        <RightOutlined />
        {''}
      </button>
    </div>
  );
};

export default DealsOfWeekList;
