import { ListingItemsType } from '@src/types/API/WidgetType';

interface Props {
  banners: ListingItemsType['Banner'][];
}

export default function BannerThree(props: Props) {
  const sortedBanners = props.banners.sort((a, b) => a.priority - b.priority);

  return (
    <div className='flex h-[460px] gap-2 overflow-hidden'>
      <img className='object-contain' src={sortedBanners[0].image} />
      <div className='flex flex-col gap-2'>
        {sortedBanners[1] && (
          <img className='object-contain' src={sortedBanners[1].image} />
        )}
        {sortedBanners[2] && (
          <img className='object-contain' src={sortedBanners[2].image} />
        )}
      </div>
      <div className='flex flex-col gap-2'>
        {sortedBanners[3] && (
          <img className='object-contain' src={sortedBanners[3].image} />
        )}
        {sortedBanners[4] && (
          <img className='object-contain' src={sortedBanners[4].image} />
        )}
      </div>
      <div className='flex flex-col gap-2'>
        {sortedBanners[5] && (
          <img className='object-contain' src={sortedBanners[5].image} />
        )}
        {sortedBanners[6] && (
          <img className='object-contain' src={sortedBanners[6].image} />
        )}
      </div>
    </div>
  );
}
