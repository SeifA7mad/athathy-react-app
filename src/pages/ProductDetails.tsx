import ProductDetailsItem from '@src/components/page-content/products/details.tsx';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  return (
    <div className='w-10/12 mx-auto py-16 flex flex-col gap-y-12'>
      {id && <ProductDetailsItem productId={id} />}
    </div>
  );
};

export default ProductDetails;
