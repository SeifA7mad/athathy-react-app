import TopCategoryItem from '@src/components/shared/TopCategoryItem';
import { APP_PREFIX_PATH } from '@src/configs/AppConfig';
import { QueriesKeysEnum } from '@src/configs/QueriesConfig';
import { RouteKeysEnum } from '@src/configs/RoutesConfig';
import { fetchMainCategories } from '@src/services/CategoryService';
import { fetchHomeListingWidgetsBySlug } from '@src/services/WidgetService';
import { ListingItemsType } from '@src/types/API/WidgetType';
import { useQuery } from '@tanstack/react-query';
import { Spin } from 'antd';

const TopCategories = () => {
  const { data: listingData, isFetching } = useQuery({
    queryKey: [QueriesKeysEnum.HOME_WIDGETS, 'Clear-Deal-on-Furniture'],
    queryFn: async () => fetchHomeListingWidgetsBySlug('CATEGORY'),
    initialData: null
  });

  if (isFetching) {
    return <Spin />;
  }

  return (
    <div className='w-5/6 h-full grid grid-cols-category-list m-auto gap-24 place-items-center my-32'>
      {(listingData?.listingItems as ListingItemsType['Categories'][]).map(
        (category) => (
          <TopCategoryItem
            key={category.id}
            name={category.name}
            image={category.image}
            link={`${APP_PREFIX_PATH}/${RouteKeysEnum.products}/${category.name}/${category.id}`}
          />
        )
      )}
    </div>
  );
};

export default TopCategories;
