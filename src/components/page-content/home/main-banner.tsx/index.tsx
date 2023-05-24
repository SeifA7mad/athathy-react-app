import { useEffect, useRef, useState } from 'react';

import { Carousel } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { CarouselRef } from 'antd/es/carousel';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './MainBanner.css';
import { ListingItemsType } from '@src/types/API/WidgetType';

interface BannerItemProps {
  heading: string;
  subHeading: string;
  description: string;
  imgSrc: string;
  link: string;
}

interface BannerArrowProps {
  onClick: () => void;
  direction: 'left' | 'right';
  className?: string;
}

const BannerArrow = ({ onClick, direction, className }: BannerArrowProps) => (
  <button
    className={`hidden lg:flex items-center justify-center w-20 h-20 rounded-full z-10 bg-sauvignon ${className}`}
    type='button'
    onClick={onClick}
  >
    {direction === 'left' ? <LeftOutlined /> : <RightOutlined />}
  </button>
);

const BannerItem = (props: BannerItemProps) => {
  const splitedHeading = props.heading.split(' ');

  return (
    <a
      className='w-full h-full flex justify-between items-center relative cursor-pointer'
      href={`https://${props.link}`}
      target='_blank'
      rel='noopener noreferrer'
    >
      <img
        className='object-contain w-full h-[25rem]'
        src={props.imgSrc}
        alt='banner'
        loading='lazy'
      />
      {/* <div className='flex flex-col gap-y-3 w-full md:w-1/2 absolute left-4 lg:left-40 top-1/2 -translate-y-1/2'>
        <h3 className='text-whiteSmoke font-semibold text-3xl'>
          {splitedHeading.slice(0, splitedHeading.length - 1).join(' ')}
          <span className='text-turkishRose'>
            {` ${splitedHeading.slice(splitedHeading.length - 1)}`}
          </span>
        </h3>
        {props?.subHeading && (
          <h1 className='text-OuterSpace font-bold text-6xl'>
            {props.subHeading}
          </h1>
        )}
        {props?.description && <p>{props.description}</p>}
      </div> */}
    </a>
  );
};

interface MainBannerProps {
  bannersData: ListingItemsType['MainBanner'][];
}

const MainBanner = ({ bannersData }: MainBannerProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const onNext = () => {
    setCurrentSlide((prev) => (prev + 1) % bannersData.length);
  };

  const onPrev = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : bannersData.length - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      onNext();
    }, 3000);

    return () => clearInterval(interval);
  });

  return (
    <section className='w-full bg-white h-[25rem] relative'>
      {/* <BannerArrow
        direction='left'
        onClick={onPrev}
        className='absolute top-1/2 left-5 -translate-y-1/2'
      /> */}

      <BannerItem
        heading={bannersData[currentSlide]?.name}
        imgSrc={bannersData[currentSlide]?.image}
        description={''}
        link={bannersData[currentSlide]?.forwardUrl ?? ''}
        subHeading={''}
      />

      {/* <BannerArrow
        direction='right'
        onClick={onNext}
        className='absolute top-1/2 right-5 -translate-y-1/2'
      /> */}
    </section>
  );
};

export default MainBanner;
