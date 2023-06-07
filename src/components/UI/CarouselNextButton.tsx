import { RightOutlined, LeftOutlined } from '@ant-design/icons';

interface CarouselNextButtonProps {
  onClick: () => void;
  direction?: 'left' | 'right';
  className?: string;
}

const CarouselNextButton = ({
  onClick,
  direction = 'right',
  className
}: CarouselNextButtonProps) => {
  return (
    <button
      className={`h-8 w-8 rounded-full border border-turkishRose
         bg-white flex justify-center items-center z-10 ${className}`}
      onClick={onClick}
      type='button'
    >
      {direction === 'left' ? (
        <LeftOutlined className='text-turkishRose' />
      ) : (
        <RightOutlined className='text-turkishRose' />
      )}
    </button>
  );
};

export default CarouselNextButton;
