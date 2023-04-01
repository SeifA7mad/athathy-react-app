import ArrowLink from '@src/components/UI/ArrowLink';
import ViewAllLink from '@src/components/UI/ViewAllLink';
import { Link } from 'react-router-dom';
import Heading from '../../../shared/Heading';

import ProductImage1 from '@src/assets/images/products/2.png';
import ProductImage2 from '@src/assets/images/products/5.png';
import ProductImage3 from '@src/assets/images/products/6.png';
import { ListingItemsType } from '@src/types/API/WidgetType';
import { APP_PREFIX_PATH } from '@src/configs/AppConfig';
import {
  RouteCategoriesKeysEnum,
  RouteKeysEnum
} from '@src/configs/RoutesConfig';
import { Carousel } from 'antd';
import { useRef } from 'react';
import { CarouselRef } from 'antd/es/carousel';
import TopCategoryItem from '@src/components/shared/TopCategoryItem';
interface TopCategoriesProps {
  categories: ListingItemsType['Categories'][];
  title?: string;
}

const TopCategories = ({ categories, title }: TopCategoriesProps) => {
  const carouselRef = useRef<CarouselRef>(null);
  let responsive = [
    {
      breakpoint: 1147,
      settings: {
        slidesToShow: 3,
        autoPlay: categories.length > 3
      }
    },
    {
      breakpoint: 681,
      settings: {
        slidesToShow: 2,
        autoPlay: categories.length > 2
      }
    },
    {
      breakpoint: 489,
      settings: {
        slidesToShow: 1,
        autoPlay: categories.length > 1
      }
    }
  ];
  return (
    <section className='w-11/12 max-w-[74.625rem] flex flex-col justify-center items-center gap-y-11'>
      {title && (
        <div className='w-full flex justify-between items-center'>
          <Heading tile={title} wrapperClassName='!items-start' />
          <ViewAllLink
            to={`${APP_PREFIX_PATH}/${RouteKeysEnum.category}/${RouteCategoriesKeysEnum.topCategories}`}
          />
        </div>
      )}
      {/* <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10'>
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            name={category.name}
            link={''}
            image={category.image}
          />
        ))}
      </div> */}
      <div className='relative w-full'>
        <Carousel
          ref={carouselRef}
          dots={false}
          className='w-full h-full m-auto'
          autoplay={categories.length > 4}
          autoplaySpeed={5000}
          slidesToShow={4}
          responsive={responsive}
        >
          {categories.map((category) => (
            <TopCategoryItem
              key={category.id}
              name={category.name}
              link={`${APP_PREFIX_PATH}/${RouteKeysEnum.products}/${category.name}/${category.id}`}
              image={category.image}
            />
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default TopCategories;
