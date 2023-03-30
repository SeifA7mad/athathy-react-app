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
  <div className='flex flex-col gap-y-5 m-auto'>
    <div className='w-[23.313rem] h-[23rem] bg-white rounded-3xl flex'>
      <img
        src={image}
        alt='category'
        className={`w-full h-1/2 m-auto object-contain ${imgClassName}`}
      />
    </div>
    <Link
      to={link}
      className='font-bold text-OuterSpace text-3xl hover:text-turkishRose'
    >
      {name?.toUpperCase()}
      <ArrowLink className='w-44 mt-2' />
    </Link>
  </div>
);

export default TopCategoryItem;
