import { ReviewType } from '@src/types/API/ReviewType';
import fetch from '@src/utils/FetchInterceptor';

const api = 'vendor-reviews';

export const fetchVendorReviews = async (params?: URLSearchParams) => {
  const response = await fetch({
    url: `${api}`,
    method: 'GET',
    params
  });
  return response.data as ReviewType[];
};

export const addVendorReview = async (data: {
  vendorId: string;
  title: string;
  message: string;
  files: string[];
  rating: number;
}) => {
  const response = await fetch({
    url: `${api}`,
    method: 'POST',
    data
  });
  return response.data as ReviewType;
};
