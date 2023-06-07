import OverallRating from '@src/components/shared/OverallRating';
import ReviewsList from '@src/components/shared/ReviewsList';
import { QueriesKeysEnum } from '@src/configs/QueriesConfig';
import { fetchReviews } from '@src/services/ReviewsService';
import { ProductType } from '@src/types/API/ProductType';
import { useQuery } from '@tanstack/react-query';
import { Spin } from 'antd';
import SellerDetails from './SellerDetails';

interface ProductReviewsProps {
  review: ProductType['review'];
  productId: string;
  vendorId: string;
}

const RateProgress = ({ rate, percent }: { rate: number; percent: number }) => {
  return (
    <div className='flex gap-x-2 items-center'>
      <p className='text-xs w-2 text-center font-semibold text-[#9CA4AB]'>
        {' '}
        {rate}{' '}
      </p>
      <div className={`w-11/12 h-1 rounded bg-sauvignon relative`}>
        <span
          className='absolute left-0 h-1 rounded bg-turkishRose z-10'
          style={{
            width: `${percent || 0}%`
          }}
        ></span>
      </div>
    </div>
  );
};

const ProductReviews = ({
  review,
  productId,
  vendorId
}: ProductReviewsProps) => {
  const { data: reviews, isFetching } = useQuery({
    queryKey: [QueriesKeysEnum.REVIEWS, productId],
    queryFn: async () =>
      fetchReviews(
        new URLSearchParams({ itemId: productId, page: '1', limit: '3' })
      ),
    initialData: []
  });

  return (
    <section className='w-full flex flex-col gap-y-10 justify-between mt-16'>
      <h1 className='text-2xl font-bold text-OuterSpace'>Customer Reviews</h1>
      <div className='flex flex-col lg:flex-row gap-12'>
        <div className='flex flex-col items-center gap-10'>
          <div className='w-full lg:w-[20.438rem] h-40 py-6 px-5 bg-[#F5F5F5] shadow-md rounded-3xl flex flex-col gap-y-5 self-center'>
            <div className='flex justify-between'>
              <div className='flex flex-col gap-y-2'>
                <h2 className='font-bold text-2xl text-OuterSpace'>
                  {' '}
                  {review?.overallRating || 0} out 5{' '}
                </h2>
                <OverallRating overallRating={review?.overallRating || 0} />
                <p className='font-semibold text-xs text-[#9CA4AB]'>
                  {' '}
                  Based on {review?.total || 0} reviews{' '}
                </p>
              </div>
              <div className='w-1/2 lg:w-28 flex flex-col gap-y-1'>
                <RateProgress rate={5} percent={review?.fiveStarPercent} />
                <RateProgress rate={4} percent={review?.fourStarPercent} />
                <RateProgress rate={3} percent={review?.threeStarPercent} />
                <RateProgress rate={2} percent={review?.twoStarPercent} />
                <RateProgress rate={1} percent={review?.oneStarPercent} />
              </div>
            </div>
          </div>
          <SellerDetails vendorId={vendorId} />
        </div>
        <div className='w-full lg:w-3/4'>
          {!isFetching && <ReviewsList reviews={reviews} />}
          {isFetching && <Spin />}
        </div>
      </div>
    </section>
  );
};

export default ProductReviews;
