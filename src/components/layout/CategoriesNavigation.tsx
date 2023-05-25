import { NavLink } from 'react-router-dom';

import { MainCategoryType } from '@src/types/API/CategoryType';
import { APP_PREFIX_PATH } from '@src/configs/AppConfig';
import { RouteKeysEnum } from '@src/configs/RoutesConfig';
import { useQuery } from '@tanstack/react-query';
import * as CategoryService from '@src/services/CategoryService';
import { QueriesKeysEnum } from '@src/configs/QueriesConfig';

interface CategoriesNavigationLinksProps {
  categories: MainCategoryType[];
}

interface CategoriesNavigationLinkItemProps {
  category: MainCategoryType;
}

const CategoriesNavigationLinkItem = ({
  category
}: CategoriesNavigationLinkItemProps) => {
  return (
    <li>
      <NavLink
        to={`${APP_PREFIX_PATH}/${RouteKeysEnum.products}/${category.name}/${category.id}`}
        className={({ isActive }) =>
          `font-medium ${
            isActive ? 'text-turkishRose' : 'text-OuterSpace'
          } hover:text-turkishRose transition duration-300 ease-in-out`
        }
      >
        {category.name?.toUpperCase()}
      </NavLink>
    </li>
  );
};

const CategoriesNavigationLinks = ({
  categories
}: CategoriesNavigationLinksProps) => {
  return (
    <ul className='gap-2 text-xs flex items-center lg:gap-4 xl:gap-8 xl:text-base overflow-x-auto py-4 scrollbar px-2'>
      {categories.map((category) => (
        <CategoriesNavigationLinkItem key={category.id} category={category} />
      ))}
    </ul>
  );
};

const CategoriesNavigation = () => {
  const { data: categoriesData } = useQuery({
    queryKey: [QueriesKeysEnum.MAIN_CATEGORIES],
    queryFn: async () => CategoryService.fetchMainCategories(),
    initialData: []
  });

  return (
    <section className='bg-white overflow-x-auto h-[4.4rem] flex justify-center items-center gap-x-8 xl:gap-x-24 px-7 whitespace-nowrap overflow-hidden'>
      <CategoriesNavigationLinks categories={categoriesData} />
      {/* <Link
        to='https://vendor.athathy.ae'
        target='_blank'
        rel='noopener noreferrer'
        className='text-turkishRose font-semibold text-base xl:text-2xl ml-auto'
      >
        Become a partner
      </Link> */}
    </section>
  );
};

export default CategoriesNavigation;
