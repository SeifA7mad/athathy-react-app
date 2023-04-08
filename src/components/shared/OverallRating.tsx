import { Rate } from 'antd';

const OverallRating = ({ overallRating }: { overallRating: number }) => {
  return (
    <div className='bg-sauvignon rounded-xl py-1 px-2'>
      <Rate disabled defaultValue={overallRating} />
    </div>
  );
};

export default OverallRating;
