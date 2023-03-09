import Heading from '@src/components/shared/Heading';
import ViewAllLink from '@src/components/UI/ViewAllLink';
import { RightOutlined } from '@ant-design/icons';
import ProductCard from '@src/components/shared/ProductCard';

import ProductImage from '@src/assets/images/products/7.png';

interface AdditionalProductListProps {
  tile: string;
  fetchProducts: () => void;
  viewAllLink?: string;
}

const AdditionalProductList = ({
  tile,
  viewAllLink,
  fetchProducts
}: AdditionalProductListProps) => {
  //TODO: fetch products using useQuery hook based on the function passed in fetchProducts

  return (
    <div className='w-full flex flex-col gap-y-10'>
      <div className='flex justify-between items-center'>
        <Heading
          wrapperClassName='!items-start !gap-y-4'
          titleClassName='!text-2xl !font-bold !text-gray40'
          dividerClassName='!w-96'
          tile={tile}
        />
        {viewAllLink && (
          <ViewAllLink className='no-underline text-firebrick' to={viewAllLink}>
            <RightOutlined className='text-turkishRose' />
          </ViewAllLink>
        )}
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 justify-items-center'>
        {[...Array(6)].map((_, i) => (
          <ProductCard
            id={i.toString()}
            key={i}
            className='drop-shadow-xl'
            name='Seater sofa 1 Seat'
            price={87}
            oldPrice={99}
            rating={4.4}
            reviews={532}
            image={ProductImage}
          />
        ))}
      </div>
    </div>
  );
};

export default AdditionalProductList;
