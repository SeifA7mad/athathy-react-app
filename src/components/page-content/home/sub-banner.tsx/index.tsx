import CarouselNextButton from '@src/components/UI/CarouselNextButton';
import { ListingItemsType } from '@src/types/API/WidgetType';
import { Carousel } from 'antd';
import { CarouselRef } from 'antd/es/carousel';
import { useRef } from 'react';

interface SubBannersProps {
  banners: ListingItemsType['Banner'][];
}

const SubBanners = ({ banners }: SubBannersProps) => {
  return (
    <section
      className={`flex overflow-x-auto py-4 scrollbar w-11/12 max-w-[60rem] lg:max-w-[76rem] 2xl:max-w-[90rem]`}
    >
      {banners.map((banner) => (
        <a
          href={`https://${banner.forwardUrl}`}
          target='_blank'
          rel='noopener noreferrer'
          key={banner.id}
          className='flex-shrink-0'
        >
          <img
            src={banner.image}
            alt={banner.name}
            loading='lazy'
            className='object-center !w-full md:!w-11/12 object-contain cursor-pointer !flex'
          />
        </a>
      ))}
    </section>
  );
};

export default SubBanners;
