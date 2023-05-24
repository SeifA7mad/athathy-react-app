import ViewAllLink from '@src/components/UI/ViewAllLink';
import Heading from '../../../shared/Heading';

import { ListingItemsType } from '@src/types/API/WidgetType';
import { APP_PREFIX_PATH } from '@src/configs/AppConfig';
import {
  RouteCategoriesKeysEnum,
  RouteKeysEnum
} from '@src/configs/RoutesConfig';
import TopCategoryItem from '@src/components/shared/TopCategoryItem';
interface TopCategoriesProps {
  categories: ListingItemsType['Categories'][];
  title?: string;
}

const TopCategories = ({ categories, title }: TopCategoriesProps) => {
  return (
    <section className='w-11/12 max-w-[60rem] lg:max-w-[76rem] 2xl:max-w-[90rem] flex flex-col justify-center items-center gap-y-11'>
      {title && (
        <div className='flex justify-between items-center'>
          <Heading tile={title} wrapperClassName='!items-start' />
        </div>
      )}

      <div className='relative w-full grid grid-flow-row grid-cols-4 gap-4'>
        {categories.map((category) => (
          <TopCategoryItem
            key={category.id}
            name={category.name}
            link={`${APP_PREFIX_PATH}/${RouteKeysEnum.products}/${category.name}/${category.id}`}
            image={category.image}
          />
        ))}
      </div>
      <ViewAllLink
        to={`${APP_PREFIX_PATH}/${RouteKeysEnum.category}/${RouteCategoriesKeysEnum.topCategories}`}
      />
    </section>
  );
};

export default TopCategories;
