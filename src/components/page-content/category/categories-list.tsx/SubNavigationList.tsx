import { QueriesKeysEnum } from '@src/configs/QueriesConfig';
import { useQuery } from '@tanstack/react-query';
import * as CategoryService from '@src/services/CategoryService';
import { MainCategoryType } from '@src/types/API/CategoryType';
import { Link } from 'react-router-dom';
import { Spin } from 'antd';
import { APP_PREFIX_PATH } from '@src/configs/AppConfig';
import { RouteKeysEnum } from '@src/configs/RoutesConfig';

interface NavListProps {
  title: string;
  categories: MainCategoryType[];
}

const NavList = ({ title, categories }: NavListProps) => (
  <ul className="flex flex-col gap-y-8 text-firebrick">
    <li>
      <h1 className="font-medium text-[1.125rem]"> {title} </h1>
    </li>
    {categories.map((item) => (
      <li key={item.id}>
        <Link
          className="hover:text-turkishRose"
          to={`${APP_PREFIX_PATH}/${RouteKeysEnum.products}/${item.id}`}
        >
          {item.name}
        </Link>
      </li>
    ))}
  </ul>
);

interface SubNavigationListProps {
  categoryId: string;
}

const SubNavigationList = ({ categoryId }: SubNavigationListProps) => {
  const { data: categoryData, isFetching } = useQuery({
    queryKey: [QueriesKeysEnum.CATEGORIES, categoryId],
    queryFn: async () => CategoryService.fetchCategoryChildren(categoryId),
    enabled: !!categoryId,
    initialData: null
  });

  if (isFetching) {
    return <Spin />;
  }

  return (
    <div className="flex flex-col gap-y-8">
      <h1 className="font-semibold text-firebrick text-xl">
        {' '}
        {categoryData?.name}{' '}
      </h1>
      <NavList title="Most Popular" categories={categoryData?.children || []} />
    </div>
  );
};

export default SubNavigationList;
