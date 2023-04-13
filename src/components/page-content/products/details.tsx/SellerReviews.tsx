import ReviewsList from '@src/components/shared/ReviewsList';
import { QueriesKeysEnum } from '@src/configs/QueriesConfig';
import { fetchReviews } from '@src/services/ReviewsService';
import { useQuery } from '@tanstack/react-query';
import { Spin } from 'antd';

interface SellerReviewsProps {
  vendorId: string;
}

const SellerReviews = ({ vendorId }: SellerReviewsProps) => {
  const { data: reviews, isFetching } = useQuery({
    queryKey: [QueriesKeysEnum.REVIEWS, vendorId],
    queryFn: async () =>
      fetchReviews(
        new URLSearchParams({ itemId: vendorId, page: '1', limit: '3' })
      ),
    initialData: []
  });

  if (isFetching) return <Spin />;

  return <ReviewsList reviews={reviews} className='border-t pt-2' />;
};

export default SellerReviews;
