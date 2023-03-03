import { useRef } from 'react';

import { Carousel } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { CarouselRef } from 'antd/es/carousel';

import BannerImage1 from '@src/assets/images/banners/1.png';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './MainBanner.css';

interface BannerItemProps {
  heading: string;
  subHeading: string;
  description: string;
  imgSrc: string;
}

interface BannerArrowProps {
  onClick: () => void;
  direction: 'left' | 'right';
}

const BannerItemsData: BannerItemProps[] = [
  {
    heading: 'Best Deal Online on Furniture.',
    subHeading: 'Excellent Comfort.',
    description: `Lorem ipsum dolor sit amet consectetur. Ut sit blandit vitae tempor ridiculus tincidunt nunc. Enim fusce dolor vestibulum id quis diam condimentum ultricies.`,
    imgSrc: BannerImage1
  },
  {
    heading: 'Best Deal Offline on Furniture.',
    subHeading: 'Excellent Comfort.',
    description: `Lorem ipsum dolor sit amet consectetur. Ut sit blandit vitae tempor ridiculus tincidunt nunc. Enim fusce dolor vestibulum id quis diam condimentum ultricies.`,
    imgSrc: BannerImage1
  }
];

const BannerArrow = ({ onClick, direction }: BannerArrowProps) => (
  <button
    className="hidden lg:flex items-center justify-center w-20 h-20 rounded-full bg-sauvignon"
    type="button"
    onClick={onClick}
  >
    {direction === 'left' ? <LeftOutlined /> : <RightOutlined />}
  </button>
);

const BannerItem = (props: BannerItemProps) => {
  const splitedHeading = props.heading.split(' ');

  return (
    <div className="w-full flex justify-between items-center mt-12 md:m-0">
      <div className="flex flex-col gap-y-3 w-full md:w-1/2">
        <h3 className="text-whiteSmoke font-semibold text-3xl">
          {splitedHeading.slice(0, splitedHeading.length - 1).join(' ')}
          <span className="text-turkishRose">
            {` ${splitedHeading.slice(splitedHeading.length - 1)}`}
          </span>
        </h3>
        <h1 className="text-OuterSpace font-bold text-6xl">
          {props.subHeading}
        </h1>
        <p>{props.description}</p>
      </div>
      <img
        className="!hidden md:!block object-scale-down lg:object-cover w-2/5 max-w-md h-full"
        src={props.imgSrc}
        alt="banner"
        loading="lazy"
      />
    </div>
  );
};

const MainBanner = () => {
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

  return (
    <section className="w-full bg-white h-[29rem] flex items-center justify-around">
      <BannerArrow direction="left" onClick={onPrev} />
      <Carousel
        ref={carouselRef}
        dotPosition={'bottom'}
        prefixCls="w-11/12 lg:w-9/12 h-full relative"
        className="w-full h-full"
        autoplay={true}
        autoplaySpeed={5000}
        effect="fade"
      >
        {BannerItemsData.map((item, index) => (
          <BannerItem {...item} key={index} />
        ))}
      </Carousel>
      <BannerArrow direction="right" onClick={onNext} />
    </section>
  );
};

export default MainBanner;
