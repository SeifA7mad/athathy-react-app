import { Link } from 'react-router-dom';
import ArrowLink from '../UI/ArrowLink';

interface CategoryItemProps {
  image: string;
  name: string;
  link: string;
  imgClassName?: string;
}

const TopCategoryItem = ({
  image,
  link,
  name,
  imgClassName
}: CategoryItemProps) => (
  <div className='flex flex-col gap-y-5 m-auto lg:m-0 w-64'>
    <div className='w-full h-64 bg-white rounded-3xl flex'>
      <img
        src={image}
        alt='category'
        className={`w-full h-1/2 m-auto object-contain ${imgClassName}`}
      />
    </div>
    <div className='flex items-center justify-center'>
      <Link
        to={link}
        className='font-bold text-OuterSpace text-base text-center hover:text-turkishRose'
      >
        {name?.toUpperCase()}
      </Link>
    </div>
  </div>
);

export default TopCategoryItem;
