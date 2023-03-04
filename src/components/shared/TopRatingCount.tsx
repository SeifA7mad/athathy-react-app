import { StarFilled } from '@ant-design/icons';

interface TopRatingCountProps {
  rate?: number;
  reviews?: number;
  className?: string;
}

const TopRatingCount = ({ rate, reviews, className }: TopRatingCountProps) => (
  <p
    className={`text-xs font-semibold text-[#FFCD1A] flex items-center gap-x-1 ${className}`}
  >
    <StarFilled className="!leading-3" />
    <span>
      {rate || 0} <span className="text-[#9CA4AB]">({reviews || 0})</span>
    </span>
  </p>
);

export default TopRatingCount;
