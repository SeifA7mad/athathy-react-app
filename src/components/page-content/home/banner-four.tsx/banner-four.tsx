import Heading from '@src/components/shared/Heading';
import { ListingItemsType } from '@src/types/API/WidgetType';
import React from 'react';

interface Props {
  banners: ListingItemsType['Banner'][];
  tabTitle?: string;
}

export default function BannerFour(props: Props) {
  return (
    <section
      className={`w-11/12 2xl:max-w-[90rem] flex flex-col justify-center items-center gap-y-8 relative`}
    >
      {props.tabTitle && <Heading tile={props.tabTitle} />}
      <div className='flex flex-col w-11/12 max-w-[60rem] lg:max-w-[76rem] 2xl:max-w-[90rem] gap-2 overflow-hidden'>
        <div className='flex w-full justify-between h-[9.357rem] overflow-hidden gap-2'>
          <a
            href={`${props.banners[0]?.forwardUrl}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              className='w-[18.75rem] object-contain'
              src={props.banners[0]?.image}
            />
          </a>
          <a
            href={`${props.banners[1]?.forwardUrl}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              className='w-[18.75rem] object-contain'
              src={props.banners[1]?.image}
            />
          </a>
          <a
            href={`${props.banners[2]?.forwardUrl}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              className='w-[18.75rem] object-contain'
              src={props.banners[2]?.image}
            />
          </a>
          <a
            href={`${props.banners[3]?.forwardUrl}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              className='w-[18.75rem] object-contain'
              src={props.banners[3]?.image}
            />
          </a>
        </div>
        <a
          href={`${props.banners[4]?.forwardUrl}`}
          target='_blank'
          rel='noopener noreferrer'
        >
          <img
            className='h-[150px] object-contain'
            src={props.banners[4]?.image}
          />
        </a>
      </div>
    </section>
  );
}
