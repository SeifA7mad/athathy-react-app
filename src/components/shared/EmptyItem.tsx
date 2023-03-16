import EmptyOrderImage from '@src/assets/images/banners/no-orders.png';

interface EmptyItemProps {
  title: string;
  description?: string;
  onClick?: () => void;
  buttonText?: string;
  image?: string;
}

const EmptyItem = ({
  image,
  title,
  buttonText,
  description,
  onClick
}: EmptyItemProps) => {
  return (
    <div className='flex flex-col gap-y-4 m-auto justify-center items-center max-w-sm text-center'>
      <img
        alt='Empty'
        src={image || EmptyOrderImage}
        className='w-[26rem] h-52'
      />

      <h3 className='text-2xl font-bold text-turkishRose'>{title}</h3>
      {description && (
        <p className='font-medium text-whiteSmoke'>{description}</p>
      )}
      {onClick && (
        <button
          className='font-medium text-white bg-turkishRose rounded-lg py-2 px-10'
          type='button'
          onClick={onClick}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default EmptyItem;
