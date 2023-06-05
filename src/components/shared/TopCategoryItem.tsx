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
  <Link to={link} className=''>
    <div className='flex flex-col gap-y-5 m-auto lg:m-0 w-64'>
      <img
        src={image}
        alt='category'
        className={`h-[13.75rem] aspect-square object-cover rounded-3xl bg-white ${imgClassName}`}
      />
      <div className='flex items-center justify-center font-bold text-OuterSpace text-base text-center hover:text-turkishRose'>
        {name?.toUpperCase()}
      </div>
    </div>
  </Link>
);

export default TopCategoryItem;
