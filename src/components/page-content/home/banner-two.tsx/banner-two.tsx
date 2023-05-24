import { ListingItemsType } from '@src/types/API/WidgetType';

interface Props {
  banners: ListingItemsType['Banner'][];
}

export default function BannerTwo(props: Props) {
  const sortedBanners = props.banners.sort((a, b) => a.priority - b.priority);

  return (
    <div className='flex gap-4'>
      <img
        className='w-[150px] h-[250px] object-contain'
        src={sortedBanners[0].image}
      />
      <img
        className='w-[300px] h-[250px] object-contain'
        src={sortedBanners[1].image}
      />
      <img
        className='w-[450px] h-[250px] object-contain'
        src={sortedBanners[2].image}
      />
    </div>
  );
}
