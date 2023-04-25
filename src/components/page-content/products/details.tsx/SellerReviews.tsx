import ReviewsList from '@src/components/shared/ReviewsList';
import { QueriesKeysEnum } from '@src/configs/QueriesConfig';
import { fetchVendorReviews } from '@src/services/VendorReviewsService';
import { useQuery } from '@tanstack/react-query';
import { Spin } from 'antd';

interface SellerReviewsProps {
  vendorId: string;
}

const SellerReviews = ({ vendorId }: SellerReviewsProps) => {
  const { data: reviews, isFetching } = useQuery({
    queryKey: [QueriesKeysEnum.REVIEWS, vendorId],
    queryFn: async () =>
      fetchVendorReviews(
        new URLSearchParams({ vendorId: vendorId, page: '1', limit: '5' })
      ),
    initialData: []
  });

  if (isFetching) return <Spin />;

  return <ReviewsList reviews={reviews} className='border-t pt-2' />;
};

export default SellerReviews;
