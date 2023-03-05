import AdditionalProducts from '@src/components/page-content/category/AdditionalProducts';
import CategoriesList from '@src/components/page-content/category/categories-list.tsx';
import { useParams } from 'react-router-dom';

const Category = () => {
  const { id } = useParams();

  return (
    <div className="w-full h-full flex flex-col gap-y-24 place-items-center">
      <CategoriesList categoryId={id} />
      <AdditionalProducts />
    </div>
  );
};

export default Category;
