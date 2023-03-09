import ProductDetailsItem from '@src/components/page-content/products/details.tsx';
import AdditionalProductList from '@src/components/shared/AdditionalProductList';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  return (
    <div className='w-10/12 mx-auto py-16 flex flex-col gap-y-12'>
      {id && <ProductDetailsItem productId={id} />}
      <div className='w-11/12 max-w-[90rem] flex flex-col gap-y-36'>
        <AdditionalProductList
          tile='How about these?'
          viewAllLink=''
          fetchProducts={() => {}}
        />
        <AdditionalProductList
          tile='Bestsellers'
          viewAllLink=''
          fetchProducts={() => {}}
        />
      </div>
    </div>
  );
};

export default ProductDetails;
