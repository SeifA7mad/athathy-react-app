import BackArrowSvg from '@src/assets/svg/BackArrowSvg';
import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
  className?: string;
  onClick?: () => void;
}

const BackButton = ({ className, onClick }: BackButtonProps) => {
  const navigate = useNavigate();
  return (
    <button
      type='button'
      title='Back'
      onClick={() => (onClick ? onClick() : navigate(-1))}
      className={`w-10 h-10 rounded-full bg-white grid place-items-center hover:opacity-75 ${className}`}
    >
      <BackArrowSvg className='w-3 h-4' />
    </button>
  );
};

export default BackButton;
