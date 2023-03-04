import { useRef } from 'react';

import { Carousel, Divider } from 'antd';
import ProductImage from '@src/assets/images/products/1.png';

import { CarouselRef } from 'antd/es/carousel';
import ViewAllLink from '@src/components/UI/ViewAllLink';
import TopRatingCount from '@src/components/shared/TopRatingCount';
import CarouselNextButton from '@src/components/UI/CarouselNextButton';
import { PRICE_CURRENCY } from '@src/configs/AppConfig';
import { calculateOffPercentage } from '@src/utils/CalculateOffPercentage';

interface DealsOfWeekProductItemProps {
  productName: string;
  productPrice: number;
  productOldPrice?: number;
  productImage: string;
  rate?: number;
  reviews?: number;
}

const DealsOfWeekProductItem = (props: DealsOfWeekProductItemProps) => {
  const offPercentage = props.productOldPrice
    ? calculateOffPercentage(props.productOldPrice, props.productPrice)
    : 0;

  return (
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
          <TopRatingCount rate={props.rate} reviews={props.reviews} />
        </div>

        <img
          className="w-32 h-44 object-scale-down absolute -top-8 right-4"
          src={props.productImage}
          alt="Product"
          loading="lazy"
        />

        {offPercentage > 0 && (
          <div className="absolute bg-turkishRose w-20 h-8 rounded-tl-3xl rounded-br-2xl top-0 left-0 flex">
            <p className="text-white font-semibold text-xs m-auto tracking-wide">
              {offPercentage}% OFF
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

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
            reviews={100}
          />
        ))}
      </Carousel>
      <ViewAllLink to="" />
      <CarouselNextButton
        onClick={onNext}
        className={`absolute bottom-20 right-0 text-xs`}
      />
    </div>
  );
};

export default DealsOfWeekList;
