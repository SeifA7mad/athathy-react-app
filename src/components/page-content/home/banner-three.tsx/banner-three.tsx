import { ListingItemsType } from '@src/types/API/WidgetType';

interface Props {
  banners: ListingItemsType['Banner'][];
}

export default function BannerThree(props: Props) {
  const sortedBanners = props.banners.sort((a, b) => a.priority - b.priority);

  return (
    <div className='flex h-[460px] gap-2 overflow-hidden'>
      <a
        href={`${sortedBanners[0].forwardUrl}`}
        target='_blank'
        rel='noopener noreferrer'
      >
        <img className='object-contain' src={sortedBanners[0].image} />
      </a>
      <div className='flex flex-col gap-2'>
        {sortedBanners[1] && (
          <a
            href={`${sortedBanners[1].forwardUrl}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <img className='object-contain' src={sortedBanners[1].image} />
          </a>
        )}
        {sortedBanners[2] && (
          <a
            href={`${sortedBanners[2].forwardUrl}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <img className='object-contain' src={sortedBanners[2].image} />
          </a>
        )}
      </div>
      <div className='flex flex-col gap-2'>
        {sortedBanners[3] && (
          <img className='object-contain' src={sortedBanners[3].image} />
        )}
        {sortedBanners[4] && (
          <a
            href={`${sortedBanners[4].forwardUrl}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <img className='object-contain' src={sortedBanners[4].image} />
          </a>
        )}
      </div>
      <div className='flex flex-col gap-2'>
        {sortedBanners[5] && (
          <a
            href={`${sortedBanners[5].forwardUrl}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <img className='object-contain' src={sortedBanners[5].image} />
          </a>
        )}
        {sortedBanners[6] && (
          <img className='object-contain' src={sortedBanners[6].image} />
        )}
      </div>
    </div>
  );
}
