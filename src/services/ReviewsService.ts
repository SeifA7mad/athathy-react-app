import { CityType } from '@src/types/API/CityType';
import { ReviewType } from '@src/types/API/ReviewType';
import fetch from '@src/utils/FetchInterceptor';

const api = 'reviews';

export const fetchReviews = async (
  params?: URLSearchParams
) => {
  const response = await fetch({
    url: `${api}`,
    method: 'GET',
    params
  });
  return response.data as ReviewType[];
};
