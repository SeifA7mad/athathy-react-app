import Heading from '@src/components/shared/Heading';
import { ListingItemsType } from '@src/types/API/WidgetType';

interface Props {
  banners: ListingItemsType['Banner'][];
  tabTitle?: string;
}

export default function BannerThree(props: Props) {
  return (
    <section
      className={`w-11/12 2xl:max-w-[90rem] flex flex-col justify-center items-center gap-y-8 relative`}
    >
      {props.tabTitle && <Heading tile={props.tabTitle} />}

      <div className='flex h-[28.75rem] gap-2 overflow-hidden'>
        <a
          href={`${props.banners[0]?.forwardUrl}`}
          target='_blank'
          rel='noopener noreferrer'
        >
          <img
            className='h-[28.75rem] w-[18.75rem] object-cover'
            src={props.banners[0]?.image}
          />
        </a>
        <div className='flex flex-col gap-2'>
          {props.banners[1] && (
            <a
              href={`${props.banners[1]?.forwardUrl}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              <img
                className='h-[9.375rem] w-[18.75rem] object-cover'
                src={props.banners[1]?.image}
              />
            </a>
          )}
          {props.banners[2] && (
            <a
              href={`${props.banners[2]?.forwardUrl}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              <img
                className='h-[18.75rem] w-[18.75rem] object-cover'
                src={props.banners[2]?.image}
              />
            </a>
          )}
        </div>
        <div className='flex flex-col gap-2'>
          {props.banners[3] && (
            <img
              className='h-[18.75rem] w-[18.75rem] object-cover'
              src={props.banners[3]?.image}
            />
          )}
          {props.banners[4] && (
            <a
              href={`${props.banners[4]?.forwardUrl}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              <img
                className='h-[9.375rem] w-[18.75rem] object-cover'
                src={props.banners[4]?.image}
              />
            </a>
          )}
        </div>
        <div className='flex flex-col gap-2'>
          {props.banners[5] && (
            <a
              href={`${props.banners[5]?.forwardUrl}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              <img
                className='h-[9.375rem] w-[18.75rem] object-cover'
                src={props.banners[5]?.image}
              />
            </a>
          )}
          {props.banners[6] && (
            <img
              className='h-[18.75rem] w-[18.75rem] object-cover'
              src={props.banners[6]?.image}
            />
          )}
        </div>
      </div>
    </section>
  );
}
