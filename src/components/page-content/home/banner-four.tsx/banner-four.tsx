import { ListingItemsType } from '@src/types/API/WidgetType';
import React from 'react';

interface Props {
  banners: ListingItemsType['Banner'][];
}

export default function BannerFour(props: Props) {
  const sortedBanners = props.banners.sort((a, b) => a.priority - b.priority);

  return (
    <div className='flex flex-col gap-2 overflow-hidden'>
      <div className='flex w-full justify-between h-[150px] overflow-hidden gap-2'>
        <img className='object-contain' src={sortedBanners[0].image} />
        <img className='object-contain' src={sortedBanners[1].image} />
        <img className='object-contain' src={sortedBanners[2].image} />
        <img className='object-contain' src={sortedBanners[3].image} />
      </div>
      <img className='h-[150px] object-contain' src={sortedBanners[4].image} />
    </div>
  );
}
