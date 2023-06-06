import Heading from '@src/components/shared/Heading';
import ViewAllLink from '@src/components/UI/ViewAllLink';
import { RightOutlined } from '@ant-design/icons';
import ProductCard, {
  ProductCardProps
} from '@src/components/shared/ProductCard';
import { Carousel } from 'antd';
interface AdditionalProductListProps {
  tile: string;
  viewAllLink?: string;
  products: ProductCardProps[];
}

const AdditionalProductList = ({
  tile,
  viewAllLink,
  products
}: AdditionalProductListProps) => {
  // let responsive = [
  //   {
  //     breakpoint: 1536,
  //     settings: {
  //       slidesToShow: products.length > 5 ? 5 : products.length,
  //       autoplay: products.length > 5
  //     }
  //   },
  //   {
  //     breakpoint: 1129,
  //     settings: {
  //       slidesToShow: products.length > 4 ? 4 : products.length,
  //       autoplay: products.length > 4
  //     }
  //   },
  //   {
  //     breakpoint: 864,
  //     settings: {
  //       slidesToShow: products.length > 3 ? 3 : products.length
  //     }
  //   },
  //   {
  //     breakpoint: 480,
  //     settings: {
  //       slidesToShow: products.length > 2 ? 2 : products.length
  //     }
  //   }
  // ];

  return (
    <div className='w-full max-w-[60rem] lg:max-w-[76rem] 2xl:max-w-[90rem] flex flex-col gap-y-[1.5625rem]'>
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
      <Carousel
        className={`h-full w-full ml-20`}
        autoplaySpeed={5000}
        autoplay={products.length > 6}
        slidesToShow={products.length > 6 ? 6 : products.length}
        centerMode={false}
        infinite={false}
        dots={false}
        prefixCls='ant-additional-product-list'
        // responsive={responsive}
      >
        {products?.map((product, index) => (
          <ProductCard key={product.id + index} {...product} />
        ))}
      </Carousel>
    </div>
  );
};

export default AdditionalProductList;
