import { ListingItemsType } from '@src/types/API/WidgetType';

interface Props {
  banners: ListingItemsType['Banner'][];
}

export default function BannerTwo(props: Props) {
  const sortedBanners = props.banners.sort((a, b) => a.priority - b.priority);

  return (
    <div className='flex gap-4 w-11/12 max-w-[60rem] lg:max-w-[76rem] 2xl:max-w-[90rem]'>
      <a
        href={`${sortedBanners[0].forwardUrl}`}
        target='_blank'
        rel='noopener noreferrer'
      >
        <img
          className='w-[9.375rem] h-[15.625rem] object-contain'
          src={sortedBanners[0].image}
        />
      </a>

      <a
        href={`${sortedBanners[1].forwardUrl}`}
        target='_blank'
        rel='noopener noreferrer'
      >
        <img
          className='w-[18.75rem] h-[15.625rem] object-contain'
          src={sortedBanners[1].image}
        />
      </a>

      <a
        href={`${sortedBanners[2].forwardUrl}`}
        target='_blank'
        rel='noopener noreferrer'
      >
        <img
          className='w-[28.125rem] h-[15.625rem] object-contain'
          src={sortedBanners[2].image}
        />
      </a>
    </div>
  );
}
