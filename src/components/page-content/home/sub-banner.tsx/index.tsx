import CarouselNextButton from '@src/components/UI/CarouselNextButton';
import { ListingItemsType } from '@src/types/API/WidgetType';
import { Carousel } from 'antd';
import { CarouselRef } from 'antd/es/carousel';
import { useRef } from 'react';

interface SubBannersProps {
  banners: ListingItemsType['Banner'][];
}

const SubBanners = ({ banners }: SubBannersProps) => {
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
    <section className={`relative w-11/12 max-w-[100rem]`}>
      <Carousel
        ref={carouselRef}
        autoplay={true}
        autoplaySpeed={10000}
        slidesToShow={1}
        dots={false}
      >
        {banners.map((banner) => (
          <img
            key={banner.id}
            src={banner.image}
            alt={banner.name}
            loading='lazy'
            className='object-center object-contain cursor-pointer'
          />
        ))}
      </Carousel>
      <CarouselNextButton
        onClick={onNext}
        className={`absolute top-1/2 -right-2 text-xs`}
      />
    </section>
  );
};

export default SubBanners;
