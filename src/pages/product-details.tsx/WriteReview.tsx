import WriteReviewForm from '@src/components/forms/WriteReviewForm';
import ReviewsLayout from '@src/components/page-content/products/details.tsx/ReviewsLayout';
import TopRatingCount from '@src/components/shared/TopRatingCount';
import { ProductType } from '@src/types/API/ProductType';

interface ProductCardProps {
  product: ProductType | null;
}

const WriteReview = ({ product }: ProductCardProps) => {
  if (!product) {
    return null;
  }

  return (
    <ReviewsLayout title='Write a review'>
      <WriteReviewForm productId={product.id}>
        <div className='bg-[#F5F5F5] w-fit py-5 px-10 rounded-lg flex justify-center items-center gap-x-4'>
          <img
            src={product?.images[0]}
            alt='Product'
            loading='lazy'
            className='w-20 h-20 object-cover'
          />
          <div className='flex flex-col'>
            <h5 className='text-xs font-medium text-whiteSmoke'>
              {product.name}
            </h5>
            <h2 className='font-semibold text-lg text-OuterSpace'>
              {product.name}
            </h2>
            <div className='flex gap-x-2'>
              <p className='text-xs font-medium text-whiteSmoke'>
                Sold by {product.brand.name}
              </p>
              <TopRatingCount
                reviews={product.review.total}
                rate={product.review.overallRating}
              />
            </div>
          </div>
        </div>
      </WriteReviewForm>
    </ReviewsLayout>
  );
};

export default WriteReview;
