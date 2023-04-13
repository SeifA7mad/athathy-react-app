import { ReviewType } from '@src/types/API/ReviewType';
import { Rate } from 'antd';
import TimeAgo from 'javascript-time-ago';

import { DownOutlined } from '@ant-design/icons';

interface ReviewsListProps {
  reviews: ReviewType[];
  onShowMore?: () => void;
  className?: string;
}

const timeago = new TimeAgo('en-US');

const ReviewsList = ({ reviews, onShowMore, className }: ReviewsListProps) => {
  return (
    <ul className='flex flex-col w-full gap-y-5'>
      {reviews.map((review) => (
        <li
          key={review.id}
          className={`flex gap-x-3 w-full border-b border-dashed border-[#A0A8AE] pb-5 ${className}`}
        >
          <img
            src={review.userIcon}
            alt='user'
            loading='lazy'
            className='w-10 h-10 rounded-full'
          />
          <div className='flex flex-col gap-y-3 w-full'>
            <div className='flex justify-between w-full'>
              <div className='flex flex-col'>
                <h3>{review.userName}</h3>
                <div className='flex gap-x-2 items-center'>
                  <Rate disabled defaultValue={review.rating} />
                  <p className='text-OuterSpace font-bold text-[0.625rem]'>
                    {review.rating.toFixed(1)}
                  </p>
                </div>
              </div>
              <p className='text-[#8C8C8C] text-[0.625rem] font-medium'>
                {timeago.format(new Date(review.createdAt * 1000))}
              </p>
            </div>
            <p className='text-OuterSpace text-xs font-medium'>
              {review.message}
            </p>
          </div>
        </li>
      ))}
      <button
        type='button'
        onClick={onShowMore}
        className='flex gap-x-1 text-xs text-turkishRose font-bold'
      >
        See all reviews <DownOutlined className='text-xs' />
      </button>
    </ul>
  );
};

export default ReviewsList;
