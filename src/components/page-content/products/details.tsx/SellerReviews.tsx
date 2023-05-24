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

  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-sm font-bold text-OuterSpace border-b-2 border-turkishRose py-1 pr-4 w-fit'>
        Reviews
      </h2>
      <ReviewsList reviews={reviews} className='pt-2' />
    </div>
  );
};

export default SellerReviews;
