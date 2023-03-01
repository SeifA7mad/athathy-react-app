import { Link, NavLink } from 'react-router-dom';

import { DownOutlined } from '@ant-design/icons';
import { CategoryType } from '@src/types/API/CategoryType';
import { APP_PREFIX_PATH } from '@src/configs/AppConfig';
import { RouteKeysEnum } from '@src/configs/RoutesConfig';
import { useQuery } from '@tanstack/react-query';
import { fetchMainCategories } from '@src/services/CategoryService';
import { QueriesKeysEnum } from '@src/configs/QueriesConfig';

interface CategoriesNavigationLinksProps {
  categories: CategoryType[];
}

interface CategoriesNavigationLinkItemProps {
  category: CategoryType;
}

const CategoriesNavigationLinkItem = ({
  category
}: CategoriesNavigationLinkItemProps) => {
  return (
    <li>
      <NavLink
        to={`${APP_PREFIX_PATH}/${RouteKeysEnum.Categories}/${category.id}`}
        className={({ isActive }) =>
          `text-xl font-semibold ${
            isActive ? 'text-turkishRose' : 'text-OuterSpace'
          } hover:text-turkishRose transition duration-300 ease-in-out`
        }
      >
        {category.name}
      </NavLink>
    </li>
  );
};

const CategoriesNavigationLinks = ({
  categories
}: CategoriesNavigationLinksProps) => {
  return (
    <ul className="flex items-center gap-x-8">
      {categories.map((category) => (
        <CategoriesNavigationLinkItem key={category.id} category={category} />
      ))}
    </ul>
  );
};

const CategoriesNavigation = () => {
  const { data: categoriesData } = useQuery({
    queryKey: [QueriesKeysEnum.MAIN_CATEGORIES],
    queryFn: async () => fetchMainCategories(),
    initialData: []
  });

  return (
    <section className="bg-white shadow h-20 flex items-center gap-x-24 px-7 whitespace-nowrap">
      <Link
        to={`${APP_PREFIX_PATH}/${RouteKeysEnum.Categories}`}
        className="text-turkishRose font-semibold text-xl flex place-items-center gap-x-4"
      >
        All Categories <DownOutlined className="text-base" />
      </Link>
      <CategoriesNavigationLinks categories={categoriesData} />
    </section>
  );
};

export default CategoriesNavigation;
