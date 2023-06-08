import Heading from '@src/components/shared/Heading';
import TopCategoryItem from '@src/components/shared/TopCategoryItem';
import { APP_PREFIX_PATH } from '@src/configs/AppConfig';
import { QueriesKeysEnum } from '@src/configs/QueriesConfig';
import { RouteKeysEnum } from '@src/configs/RoutesConfig';
import { fetchMainCategories } from '@src/services/CategoryService';
import { fetchHomeListingWidgetsBySlug } from '@src/services/WidgetService';
import { ListingItemsType } from '@src/types/API/WidgetType';
import { useQuery } from '@tanstack/react-query';
import { Spin } from 'antd';
import { useParams } from 'react-router-dom';

const TopCategories = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: listingData, isFetching } = useQuery({
    queryKey: [QueriesKeysEnum.HOME_WIDGETS, 'Clear-Deal-on-Furniture'],
    queryFn: async () => fetchHomeListingWidgetsBySlug(slug as string),
    initialData: null,
    enabled: !!slug
  });

  if (isFetching) {
    return <Spin />;
  }

  return (
    <>
      {listingData?.tabTitle && <Heading tile={listingData?.tabTitle} wrapperClassName='mt-5' />}
      <div className='w-5/6 h-full grid grid-cols-category-list m-auto gap-24 place-items-center my-32'>
        {(listingData?.listingItems as ListingItemsType['Categories'][])?.map(
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
    </>
  );
};

export default TopCategories;
