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
  return (
    <section
      className={`w-11/12 max-w-[60rem] lg:max-w-[76rem] 2xl:max-w-[90rem] flex flex-col justify-center items-center gap-y-8 relative`}
    >
      {title && <Heading tile={title} />}

      <div className='flex overflow-x-auto scrollbar py-4 gap-2 w-full h-full'>
        {productTemplates.map((productTemplate) => (
          <ProductCard
            className='m-auto flex-shrink-0'
            key={productTemplate.id}
            id={productTemplate.products[0]?.id}
            templateId={productTemplate.id}
            name={productTemplate.name}
            image={productTemplate?.products[0]?.images?.[0]}
            images={productTemplate?.products[0]?.images}
            price={productTemplate.products[0]?.price || 0}
            oldPrice={productTemplate.products[0]?.mrpPrice}
            rating={productTemplate.products[0]?.review?.overallRating}
            reviews={productTemplate.products[0]?.review?.total}
          />
        ))}
      </div>
    </section>
  );
};

export default ClearanceDeals;
