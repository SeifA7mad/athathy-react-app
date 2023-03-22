import ProductCard from '@src/components/shared/ProductCard';
import { ProductType } from '@src/types/API/ProductType';
import { Empty, Spin } from 'antd';

interface ProductsSearchListProps {
  products: ProductType[] | undefined;
  isFetching: boolean;
}

const ProductsList = ({ products, isFetching }: ProductsSearchListProps) => {
  if (isFetching) {
    return <Spin className='!min-h-[18rem]' />;
  }

  if (!products || products.length === 0) {
    return <Empty description='No products found!' className='min-h-[18rem]' />;
  }

  return (
    <div
      className={`grid grid-flow-row grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-y-16 gap-x-5 
      w-11/12 self-start`}
    >
      {products?.map((product) => (
        <ProductCard
          templateId={product.productTemplateId}
          id={product.id}
          key={product.id}
          name={product.name}
          price={product.price}
          oldPrice={product.mrpPrice}
          image={product.images[0]}
          rating={product?.review?.overallRating}
          reviews={product?.review?.total}
          variantId={product?.variant?.id}
        />
      ))}
    </div>
  );
};

export default ProductsList;
