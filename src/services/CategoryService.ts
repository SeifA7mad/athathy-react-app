import { CategoryType } from '@src/types/API/CategoryType';
import fetch from '@src/utils/FetchInterceptor';

const api = 'categories';

export const fetchMainCategories = async (
  params?: URLSearchParams
): Promise<CategoryType[]> => {
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
