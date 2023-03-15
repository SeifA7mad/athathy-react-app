import { StateType } from '@src/types/API/StateType';
import fetch from '@src/utils/FetchInterceptor';

const api = 'state';

export const fetchActiveStates = async (
  params?: URLSearchParams
): Promise<StateType[]> => {
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
