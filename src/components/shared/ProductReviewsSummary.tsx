import OverallRating from './OverallRating';

interface Props {
  overallRating: number;
  reviewsCount: number;
}

export default function ProductReviewsSummary(props: Props) {
  return (
    <div className='flex items-center gap-2'>
      <OverallRating
        overallRating={props.overallRating}
        className='bg-transparent !p-0 !py-2'
      />
      <span className='text-yellow-500 font-semibold'>
        {props.overallRating}
      </span>
      <span className='text-whiteSmoke font-semibold ml-3'>
        &#40;{props.reviewsCount} reviews&#41;
      </span>
    </div>
  );
}
