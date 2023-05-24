import { ListingItemsType } from '@src/types/API/WidgetType';
import React from 'react';

interface Props {
  banners: ListingItemsType['Banner'][];
}

export default function BannerFour(props: Props) {
  const sortedBanners = props.banners.sort((a, b) => a.priority - b.priority);

  return (
    <div className='flex flex-col w-11/12 max-w-[60rem] lg:max-w-[76rem] 2xl:max-w-[90rem] gap-2 overflow-hidden'>
      <div className='flex w-full justify-between h-[9.357rem] overflow-hidden gap-2'>
        <a
          href={`${sortedBanners[0]?.forwardUrl}`}
          target='_blank'
          rel='noopener noreferrer'
        >
          <img
            className='w-[18.75rem] object-contain'
            src={sortedBanners[0]?.image}
          />
        </a>
        <a
          href={`${sortedBanners[1]?.forwardUrl}`}
          target='_blank'
          rel='noopener noreferrer'
        >
          <img
            className='w-[18.75rem] object-contain'
            src={sortedBanners[1]?.image}
          />
        </a>
        <a
          href={`${sortedBanners[2]?.forwardUrl}`}
          target='_blank'
          rel='noopener noreferrer'
        >
          <img
            className='w-[18.75rem] object-contain'
            src={sortedBanners[2]?.image}
          />
        </a>
        <a
          href={`${sortedBanners[3]?.forwardUrl}`}
          target='_blank'
          rel='noopener noreferrer'
        >
          <img
            className='w-[18.75rem] object-contain'
            src={sortedBanners[3]?.image}
          />
        </a>
      </div>
      <a
        href={`${sortedBanners[4]?.forwardUrl}`}
        target='_blank'
        rel='noopener noreferrer'
      >
        <img
          className='h-[150px] object-contain'
          src={sortedBanners[4]?.image}
        />
      </a>
    </div>
  );
}
