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

  let responsive = [
    {
      breakpoint: 880,
      settings: {
        slidesToShow: 1
      }
    }
  ];
  return (
    <section
      className={`relative w-11/12 max-w-[60rem] lg:max-w-[76rem] 2xl:max-w-[90rem]`}
    >
      <Carousel
        ref={carouselRef}
        autoplay={true}
        autoplaySpeed={10000}
        className='w-full h-full'
        slidesToShow={banners.length > 1 ? 2 : 1}
        dots={false}
        responsive={responsive}
      >
        {banners.map((banner) => (
          <a
            href={`https://${banner.forwardUrl}`}
            target='_blank'
            rel='noopener noreferrer'
            key={banner.id}
          >
            <img
              src={banner.image}
              alt={banner.name}
              loading='lazy'
              className='object-center m-auto !w-full md:!w-11/12 object-contain cursor-pointer !flex'
            />
          </a>
        ))}
      </Carousel>
      {banners?.length > 1 && (
        <CarouselNextButton
          onClick={onNext}
          className={`absolute top-1/2 -right-2 text-xs`}
        />
      )}
    </section>
  );
};

export default SubBanners;
