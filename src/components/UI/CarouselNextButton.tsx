import { RightOutlined } from '@ant-design/icons';

interface CarouselNextButtonProps {
  onClick: () => void;
  className?: string;
}

const CarouselNextButton = ({
  onClick,
  className
}: CarouselNextButtonProps) => {
  return (
    <button
      className={`hidden w-8 h-8 rounded-full border border-turkishRose
         bg-white lg:flex justify-center items-center ${className}}`}
      onClick={onClick}
      type="button"
    >
      <RightOutlined />
      {''}
    </button>
  );
};

export default CarouselNextButton;
