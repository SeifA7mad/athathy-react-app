import { MainCategoryType, ChildrenCategoryType } from '@src/types/API/CategoryType';
import fetch from '@src/utils/FetchInterceptor';

const api = 'categories';

export const fetchMainCategories = async (
  params?: URLSearchParams
): Promise<MainCategoryType[]> => {
  const response = await fetch({
    url: `${api}/public`,
    method: 'GET',
    params: {
      level: '1',
      excludePriorityZero: true,
      orderByPriority: true,
      showDeleted: false,
      ...params
    }
  });
  return response.data;
};

export const fetchCategoryChildren = async (
  id: string,
  params?: URLSearchParams
): Promise<ChildrenCategoryType> => {
  const response = await fetch({
    url: `${api}/${id}/children/public`,
    method: 'GET',
    params
  });
  return response.data;
};
