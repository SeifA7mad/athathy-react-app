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
  <Link to={link} className='w-[13.75rem]'>
    <div className='flex flex-col w-full gap-y-[.625rem] rounded-[1.5rem] overflow-hidden hover:text-turkishRose'>
      <img
        src={image}
        alt='category'
        className={`w-full aspect-square object-cover rounded-3xl bg-white ${imgClassName}`}
      />
      <h4 className='font-bold text-OuterSpace text-base text-center px-2'>
        {name.toUpperCase()}
      </h4>
    </div>
  </Link>
);

export default TopCategoryItem;
