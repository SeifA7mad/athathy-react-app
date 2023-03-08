import ProductCard from '@src/components/shared/ProductCard';
import { ProductType } from '@src/types/API/ProductType';
import { Spin } from 'antd';

interface ProductsSearchListProps {
  products: ProductType[] | undefined;
  isFetching: boolean;
}

const ProductsList = ({ products, isFetching }: ProductsSearchListProps) => {
  if (isFetching) {
    return <Spin className='!min-h-[18rem]' />;
  }

  if (!products || products.length === 0) {
    return <p className='min-h-[18rem] self-start'> No products found! </p>;
  }

  return (
    <div
      className={`grid grid-flow-row grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-y-16 gap-x-5 
      w-11/12 self-start`}
    >
      {products?.map((product) => (
        <ProductCard
          id={product.id}
          key={product.id}
          name={product.name}
          price={product.price}
          oldPrice={product.mrpPrice}
          image={product.images[0]}
        />
      ))}
    </div>
  );
};

export default ProductsList;
