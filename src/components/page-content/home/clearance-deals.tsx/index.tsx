import { useRef, useState } from 'react';

import Heading from '../../../shared/Heading';
import ProductCard from '@src/components/shared/ProductCard';
import { ClearanceDealsTabs } from './ClearanceDealsTabs';
import { Carousel } from 'antd';

import { CarouselRef } from 'antd/es/carousel';
import CarouselNextButton from '@src/components/UI/CarouselNextButton';
import { ListingItemsType } from '@src/types/API/WidgetType';

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

interface ClearanceDealsProps {
  productTemplates: ListingItemsType['ProductTemplates'][];
  title?: string;
}

const ClearanceDeals = ({ productTemplates, title }: ClearanceDealsProps) => {
  // const [activeTabIndex, setActiveTabIndex] = useState(0);

  const carouselRef = useRef<CarouselRef>(null);

  const onNext = () => {
    if (carouselRef.current) {
      carouselRef.current.next();
    }
  };

  let responsive = [
    {
      breakpoint: 1536,
      settings: {
        slidesToShow: productTemplates.length > 5 ? 5 : productTemplates.length,
        autoplay: productTemplates.length > 5
      }
    },
    {
      breakpoint: 1129,
      settings: {
        slidesToShow: productTemplates.length > 4 ? 4 : productTemplates.length,
        autoplay: productTemplates.length > 4
      }
    },
    {
      breakpoint: 864,
      settings: {
        slidesToShow: productTemplates.length > 3 ? 3 : productTemplates.length
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: productTemplates.length > 2 ? 2 : productTemplates.length
      }
    }
  ];

  return (
    <section
      className={`w-11/12 max-w-[60rem] lg:max-w-[76rem] 2xl:max-w-[90rem] flex flex-col justify-center items-center gap-y-8 relative`}
    >
      {title && <Heading tile={title} />}
      {/* <ClearanceDealsTabs
        activeTabIndex={activeTabIndex}
        onTabClick={setActiveTabIndex}
        tabs={ClearanceDealsTabsData}
      /> */}

      <div className='relative w-full h-full'>
        <Carousel
          ref={carouselRef}
          className='w-full h-full'
          autoplaySpeed={5000}
          autoplay={productTemplates.length > 6}
          slidesToShow={6}
          centerMode={false}
          infinite={true}
          dots={false}
          responsive={responsive}
        >
          {productTemplates.map((productTemplate, index) => (
            <ProductCard
              className='m-auto'
              key={productTemplate.id}
              id={productTemplate.products[0]?.id}
              templateId={productTemplate.id}
              name={productTemplate.name}
              image={productTemplate?.products[0]?.images?.[0]}
              price={productTemplate.products[0]?.price || 0}
              oldPrice={productTemplate.products[0]?.mrpPrice}
              rating={productTemplate.products[0]?.review?.overallRating}
              reviews={productTemplate.products[0]?.review?.total}
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
