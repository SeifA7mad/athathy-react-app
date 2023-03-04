import { useRef, useState } from 'react';

import Heading from '../Heading';
import ProductCard from '@src/components/shared/ProductCard';
import { ClearanceDealsTabs } from './ClearanceDealsTabs';
import { Carousel } from 'antd';

import { CarouselRef } from 'antd/es/carousel';
import CarouselNextButton from '@src/components/UI/CarouselNextButton';

export interface ClearanceDealsTabType {
  key: string;
  title: string;
}

const ClearanceDealsTabsData: ClearanceDealsTabType[] = [
  {
    key: 'sofas',
    title: 'Sofas'
  },
  {
    key: 'tables',
    title: 'Tables'
  },
  {
    key: 'chairs',
    title: 'Chairs'
  },
  {
    key: 'accessories',
    title: 'Accessories'
  }
];

const ClearanceDeals = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const carouselRef = useRef<CarouselRef>(null);

  // TODO: Fetch data from API use react-query

  const onNext = () => {
    if (carouselRef.current) {
      carouselRef.current.next();
    }
  };

  let responsive = [
    {
      breakpoint: 1447,
      settings: {
        slidesToShow: 4
      }
    },
    {
      breakpoint: 1079,
      settings: {
        slidesToShow: 3
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2
      }
    }
  ];

  return (
    <section
      className={`w-11/12 max-w-[74.625rem] flex flex-col justify-center items-center gap-y-8 relative`}
    >
      <Heading tile="Clearance deals on Furniture" />
      <ClearanceDealsTabs
        activeTabIndex={activeTabIndex}
        onTabClick={setActiveTabIndex}
        tabs={ClearanceDealsTabsData}
      />

      <div className="relative w-full">
        <Carousel
          ref={carouselRef}
          dots={false}
          prefixCls="w-full h-full relative"
          className="w-full h-full"
          autoplay={true}
          autoplaySpeed={5000}
          slidesToShow={5}
          responsive={responsive}
        >
          {[...Array(10)].map((_, index) => (
            <ProductCard
              className="m-auto"
              key={index}
              name="Luna Chair M2"
              price={48}
              oldPrice={99}
              rating={4.4}
              reviews={532}
            />
          ))}
        </Carousel>
        <CarouselNextButton
          onClick={onNext}
          className={`absolute top-1/2 -right-2 text-xs`}
        />
      </div>
    </section>
  );
};

export default ClearanceDeals;
