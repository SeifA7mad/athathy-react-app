import { useRef, useState } from 'react';

import Heading from '../../../shared/Heading';
import ProductCard from '@src/components/shared/ProductCard';
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
  products: ListingItemsType['Products'][];
  title?: string;
}

const ClearanceDeals = ({ products, title }: ClearanceDealsProps) => {
  const carouselRef = useRef<CarouselRef>(null);

  const onPrev = () => {
    if (carouselRef.current) {
      console.log('HIII');
      carouselRef.current.prev();
    }
  };

  const onNext = () => {
    if (carouselRef.current) {
      console.log('HIII');
      carouselRef.current.next();
    }
  };

  // let responsive = [
  //   {
  //     breakpoint: 1536,
  //     settings: {
  //       slidesToShow: products.length > 5 ? 5 : products.length,
  //       autoplay: products.length > 5
  //     }
  //   },
  //   {
  //     breakpoint: 1129,
  //     settings: {
  //       slidesToShow: products.length > 4 ? 4 : products.length,
  //       autoplay: products.length > 4
  //     }
  //   },
  //   {
  //     breakpoint: 864,
  //     settings: {
  //       slidesToShow: products.length > 3 ? 3 : products.length
  //     }
  //   },
  //   {
  //     breakpoint: 480,
  //     settings: {
  //       slidesToShow: products.length > 2 ? 2 : products.length
  //     }
  //   }
  // ];

  const MAX_ITEMS = 3;

  return (
    <section
      className={`w-full max-w-[60rem] lg:max-w-[76rem] 2xl:max-w-[90rem] flex flex-col justify-center items-center gap-y-8 relative`}
    >
      {title && <Heading tile={title} />}

      <div className='flex items-center justify-center gap-[.8125rem] w-full'>
        {products.length > MAX_ITEMS && (
          <CarouselNextButton onClick={onPrev} direction='left' />
        )}
        <div className='flex items-center justify-center w-4/5'>
          <Carousel
            ref={carouselRef}
            autoplaySpeed={5000}
            autoplay={products.length > MAX_ITEMS}
            slidesToShow={
              products.length > MAX_ITEMS ? MAX_ITEMS : products.length
            }
            centerMode={false}
            infinite={true}
            dots={false}
            // responsive={responsive}
          >
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                templateId={product.id}
                name={product.name}
                brandName={product.brand?.name}
                image={product?.images?.[0]}
                images={product?.images}
                price={product?.price || 0}
                oldPrice={product.mrpPrice}
                rating={product.review?.overallRating}
                reviews={product.review?.total}
              />
            ))}
          </Carousel>
        </div>

        {products.length > MAX_ITEMS && <CarouselNextButton onClick={onNext} />}
      </div>
    </section>
  );
};

export default ClearanceDeals;
