import { ListingItemsType } from '@src/types/API/WidgetType';
import { Carousel } from 'antd';

interface Props {
  banners: ListingItemsType['Banner'][];
}

export default function BannerTwo(props: Props) {
  // const sortedBanners = props.banners.sort((a, b) => a.priority - b.priority);

  return (
    <div className='flex m-auto w-11/12'>
      <Carousel
        dots={false}
        autoplay={true}
        infinite={true}
        autoplaySpeed={5000}
        slidesToShow={props.banners.length}
        centerMode={true}
        className='flex items-center justify-center'
      >
        {props.banners.map((banner) => (
          <a
            href={`${banner?.forwardUrl}`}
            target='_blank'
            rel='noopener noreferrer'
            className='m-auto'
          >
            <img className='h-[15.625rem] object-contain' src={banner?.image} />
          </a>
        ))}
      </Carousel>
    </div>
  );
}
