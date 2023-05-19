import ProductDetailsItem from '@src/components/page-content/products/details.tsx';
import AdditionalProductList from '@src/components/shared/AdditionalProductList';
import { ProductCardProps } from '@src/components/shared/ProductCard';
import { QueriesKeysEnum } from '@src/configs/QueriesConfig';
import { fetchProducts } from '@src/services/ProductService';
import { ProductTemplateType } from '@src/types/API/ProductType';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

interface ProductDetailsProps {
  productTemplateDetails: ProductTemplateType | null;
  mainProduct: ProductTemplateType['products'][0] | null;
  productId: string | undefined;
}

const ProductDetails = ({
  productTemplateDetails,
  mainProduct,
  productId
}: ProductDetailsProps) => {
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

  const { data: productsData } = useQuery({
    queryKey: [QueriesKeysEnum.PRODUCTS, mainProduct?.category?.id],
    queryFn: async () =>
      fetchProducts(
        new URLSearchParams({
          categoryId: mainProduct?.category?.id || ''
        })
      ),
    initialData: null,
    select: (data) => ({
      ...data,
      data: data?.data?.filter(
        (product) => product.id !== mainProduct?.id
      ) as ProductTemplateType['products']
    }),
    enabled: !!mainProduct?.category?.id
  });

  return (
    <div className='w-10/12 mx-auto flex flex-col'>
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
        {productsData && productsData?.data?.length > 0 && (
          <AdditionalProductList
            tile='How about these?'
            products={productsData?.data.map((product) => ({
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.images[0],
              rating: product?.review?.overallRating,
              reviews: product?.review?.total,
              templateId: product.productTemplateId,
              oldPrice: product.mrpPrice
            }))}
          />
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
