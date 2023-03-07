import { HomeListing } from '@src/types/API/WidgetType';
import fetch from '@src/utils/FetchInterceptor';

const api = 'widget';

export const fetchHomeListingWidgetsWeb = async (
  params?: URLSearchParams
): Promise<HomeListing[]> => {
  const response = await fetch({
    url: `${api}/tab/home/Web`,
    method: 'GET',
    params
  });
  return response.data;
};
