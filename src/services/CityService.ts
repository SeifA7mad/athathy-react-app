import { CityType } from '@src/types/API/CityType';
import fetch from '@src/utils/FetchInterceptor';

const api = 'city';

export const fetchActiveCities = async (
  params?: URLSearchParams
): Promise<CityType[]> => {
  const response = await fetch({
    url: `${api}/public`,
    method: 'GET',
    params: {
      status: 'Active',
      orderByPriority: true,
      ...params
    }
  });
  return response.data;
};
