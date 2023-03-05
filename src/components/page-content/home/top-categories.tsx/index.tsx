import ArrowLink from '@src/components/UI/ArrowLink';
import ViewAllLink from '@src/components/UI/ViewAllLink';
import { Link } from 'react-router-dom';
import Heading from '../../../shared/Heading';

import ProductImage1 from '@src/assets/images/products/2.png';
import ProductImage2 from '@src/assets/images/products/5.png';
import ProductImage3 from '@src/assets/images/products/6.png';

interface CategoryItemProps {
  image: string;
  name: string;
  link: string;
  imgClassName?: string;
}

const CategoryItem = ({
  image,
  link,
  name,
  imgClassName
}: CategoryItemProps) => (
  <div className="flex flex-col gap-y-5">
    <div className="w-[23.313rem] h-[23rem] bg-white rounded-3xl flex">
      <img
        src={image}
        alt="category"
        className={`w-full h-3/4 mt-auto object-scale-down ${imgClassName}`}
      />
    </div>
    <Link to={link} className="font-bold text-OuterSpace text-3xl">
      {name}
      <ArrowLink className="w-44 mt-2" />
    </Link>
  </div>
);

const TopCategories = () => {
  return (
    <section className="w-11/12 max-w-[74.625rem] flex flex-col justify-center items-center gap-y-11">
      <div className="w-full flex justify-between items-center">
        <Heading tile="Top Categories" wrapperClassName="!items-start" />
        <ViewAllLink to="" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
        <CategoryItem name="Outdoor" link="" image={ProductImage1} />
        <CategoryItem name="Rugs" link="" image={ProductImage2} />
        <CategoryItem
          name="Lighting"
          link=""
          image={ProductImage3}
          imgClassName="!m-0"
        />
      </div>
    </section>
  );
};

export default TopCategories;
