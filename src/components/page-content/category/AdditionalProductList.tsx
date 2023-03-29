import AdditionalProductList from '@src/components/shared/AdditionalProductList';
import { QueriesKeysEnum } from '@src/configs/QueriesConfig';
import { fetchHomeListingWidgetsBySlug } from '@src/services/WidgetService';
import { ListingItemsType } from '@src/types/API/WidgetType';
import { useQuery } from '@tanstack/react-query';
import { Spin } from 'antd';

const AdditionalProducts = () => {
  const { data: listingData, isFetching } = useQuery({
    queryKey: [QueriesKeysEnum.HOME_WIDGETS, 'Clear-Deal-on-Furniture'],
    queryFn: async () =>
      fetchHomeListingWidgetsBySlug('Clear-Deal-on-Furniture'),
    initialData: null
  });

  console.log(listingData);

  if (isFetching) return <Spin />;

  return (
    <div className='w-11/12 max-w-[90rem] flex flex-col gap-y-36'>
      <AdditionalProductList
        tile='Clearance deals on Furniture'
        viewAllLink=''
        products={(
          listingData?.listingItems as ListingItemsType['ProductTemplates'][]
        )?.map((productTemplate) => ({
          id: productTemplate.products[0]?.id,
          templateId: productTemplate.id,
          name: productTemplate.name,
          image: productTemplate?.products[0]?.images?.[0],
          price: productTemplate.products[0]?.price || 0,
          oldPrice: productTemplate.products[0]?.mrpPrice,
          rating: productTemplate.products[0]?.review?.overallRating,
          reviews: productTemplate.products[0]?.review?.total
        }))}
      />
    </div>
  );
};

export default AdditionalProducts;
