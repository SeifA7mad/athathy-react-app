import { ReviewType } from '@src/types/API/ReviewType';
import fetch from '@src/utils/FetchInterceptor';

const api = 'reviews';

export const fetchReviews = async (params?: URLSearchParams) => {
  const response = await fetch({
    url: `${api}`,
    method: 'GET',
    params
  });
  return response.data as ReviewType[];
};

export const addReview = async (data: {
  orderId: string;
  itemId: string;
  title: string;
  message: string;
  files?: string[];
  rating: number;
  itemAsDescribed: boolean;
  vendorTitle?: string;
  vendorMessage: string;
  vendorRating: number;
}) => {
  const response = await fetch({
    url: `${api}`,
    method: 'POST',
    data
  });
  return response.data as ReviewType;
};
