import { QueriesKeysEnum } from '@src/configs/QueriesConfig';
import { useQuery } from '@tanstack/react-query';
import * as CategoryService from '@src/services/CategoryService';
import { NavLink } from 'react-router-dom';
import { APP_PREFIX_PATH } from '@src/configs/AppConfig';
import { RouteKeysEnum } from '@src/configs/RoutesConfig';

const MainNavigationList = () => {
  const { data: categoriesData } = useQuery({
    queryKey: [QueriesKeysEnum.MAIN_CATEGORIES],
    queryFn: async () => CategoryService.fetchMainCategories(),
    initialData: []
  });

  return (
    <ul className="flex flex-col gap-y-8 text-OuterSpace">
      {categoriesData.map((item) => (
        <li key={item.id}>
          <NavLink
            to={`${APP_PREFIX_PATH}/${RouteKeysEnum.category}/${item.id}`}
            className={({ isActive }) =>
              ` ${
                isActive && 'text-firebrick font-semibold'
              } hover:text-firebrick hover:font-semibold`
            }
          >
            {item.name}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default MainNavigationList;
