import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';

import { DownOutlined } from '@ant-design/icons';
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
          `text-sm lg:text-base xl:text-xl font-semibold ${
            isActive ? 'text-turkishRose' : 'text-OuterSpace'
          } hover:text-turkishRose transition duration-300 ease-in-out`
        }
      >
        {category.name.toUpperCase()}
      </NavLink>
    </li>
  );
};

const CategoriesNavigationLinks = ({
  categories
}: CategoriesNavigationLinksProps) => {
  return (
    <ul className='flex items-center gap-x-8'>
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

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <section className='bg-white overflow-x-auto shadow h-[4.4rem] flex items-center gap-x-8 xl:gap-x-24 px-7 whitespace-nowrap overflow-hidden'>
      <button
        onClick={() =>
          location.pathname !== `/${RouteKeysEnum.category}`
            ? navigate(`${APP_PREFIX_PATH}/${RouteKeysEnum.category}`)
            : navigate(-1)
        }
        type='button'
        className='text-turkishRose font-semibold text-base xl:text-xl flex place-items-center gap-x-4'
      >
        All Categories <DownOutlined className='text-base' />
      </button>
      <CategoriesNavigationLinks categories={categoriesData.slice(0, 5)} />
    </section>
  );
};

export default CategoriesNavigation;
