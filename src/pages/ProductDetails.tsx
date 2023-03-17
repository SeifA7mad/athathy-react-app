import ProductDetailsItem from '@src/components/page-content/products/details.tsx';
import AdditionalProductList from '@src/components/shared/AdditionalProductList';
import { ProductCardProps } from '@src/components/shared/ProductCard';
import { QueriesKeysEnum } from '@src/configs/QueriesConfig';
import { fetchProductTemplate } from '@src/services/ProductTemplateService';
import { useQuery } from '@tanstack/react-query';
import { Spin } from 'antd';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { templateId, productId } = useParams();

  const { data: productTemplateDetails, isFetching } = useQuery({
    queryKey: [QueriesKeysEnum.PRODUCTS_TEMPLATE],
    queryFn: async () => fetchProductTemplate(templateId || ''),
    initialData: null
  });

  const mainProduct = useMemo(
    () =>
      productTemplateDetails?.products.find(
        (product) =>
          product?.variant?.id === productId || product.id === productId
      ),
    [productTemplateDetails, productId]
  );

  const otherSellerProducts = useMemo<ProductCardProps[]>(
    () =>
      productTemplateDetails?.products
        .filter(
          (product) =>
            product?.variant?.id !== productId && product.id !== productId
        )
        ?.map((product) => ({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images[0],
          rating: product?.review?.overallRating,
          reviews: product?.review?.total,
          templateId: product.productTemplateId,
          oldPrice: product.mrpPrice
        })) as ProductCardProps[],
    [productTemplateDetails, productId]
  );

  if (isFetching) return <Spin />;

  return (
    <div className='w-10/12 mx-auto py-16 flex flex-col gap-y-12'>
      {mainProduct && (
        <ProductDetailsItem
          product={mainProduct}
          variants={productTemplateDetails?.variants || []}
        />
      )}
      <div className='w-11/12 max-w-[90rem] flex flex-col gap-y-36'>
        {otherSellerProducts?.length > 0 && (
          <AdditionalProductList
            tile='Other sellers'
            products={otherSellerProducts}
          />
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
