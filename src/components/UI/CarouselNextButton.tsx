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
      className={`hidden w-8 h-8 rounded-full border border-turkishRose
         bg-white lg:flex justify-center items-center z-10 ${className}`}
      onClick={onClick}
      type='button'
    >
      {direction === 'left' ? <LeftOutlined /> : <RightOutlined />}
    </button>
  );
};

export default CarouselNextButton;
