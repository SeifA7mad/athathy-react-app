import { Rate } from 'antd';

const OverallRating = ({
  overallRating,
  className
}: {
  overallRating: number;
  className?: string;
}) => {
  return (
    <div className={`bg-sauvignon rounded-xl py-1 px-2 w-fit ${className}`}>
      <Rate disabled defaultValue={overallRating} />
    </div>
  );
};

export default OverallRating;
