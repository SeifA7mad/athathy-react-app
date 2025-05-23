import { useRef, useState } from 'react';

import Heading from '../../../shared/Heading';
import ProductCard from '@src/components/shared/ProductCard';
import { Carousel } from 'antd';

import { CarouselRef } from 'antd/es/carousel';
import CarouselNextButton from '@src/components/UI/CarouselNextButton';
import { ListingItemsType } from '@src/types/API/WidgetType';

export interface ProductTemplateWidgetTabType {
  key: string;
  title: string;
}


interface ProductTemplateWidget {
  products: ListingItemsType['ProductTemplates'][];
  title?: string;
}

const ProductTemplateWidget = ({ products, title }: ProductTemplateWidget) => {
  const carouselRef = useRef<CarouselRef>(null);

  const onPrev = () => {
    if (carouselRef.current) {
      carouselRef.current.prev();
    }
  };

  const onNext = () => {
    if (carouselRef.current) {
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

  const MAX_ITEMS = 5;

  return (
    <section
      className={`w-full flex flex-col justify-center items-center gap-y-8 relative`}
    >
      {title && <Heading tile={title} />}

      <div className='flex items-center justify-center gap-[.8125rem] w-[95%] mx-auto'>
        {products.length > MAX_ITEMS && (
          <CarouselNextButton onClick={onPrev} direction='left' />
        )}
        <div className='flex items-center justify-center w-[93%] mx-auto'>
          <Carousel
            ref={carouselRef}
            autoplaySpeed={5000}
            autoplay={products.length > MAX_ITEMS}
            slidesToShow={
              products.length > MAX_ITEMS ? MAX_ITEMS : products.length
            }
            centerMode={false}
            infinite={false}
            dots={false}
            // responsive={responsive}
          >
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.products[0].id}
                templateId={product.id}
                name={product.name}
                brandName={product.brand?.name}
                image={product?.images?.[0]}
                images={product?.images}
                price={product?.products[0].price || 0}
                oldPrice={product.products[0].mrpPrice}
                rating={product.products[0].review?.overallRating}
                reviews={product.products[0].review?.total}
              />
            ))}
          </Carousel>
        </div>

        {products.length > MAX_ITEMS && <CarouselNextButton onClick={onNext} />}
      </div>
    </section>
  );
};

export default ProductTemplateWidget;
