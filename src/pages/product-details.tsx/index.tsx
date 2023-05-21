import { Route, Routes, useParams } from 'react-router-dom';
import ProductDetails from './ProductDetails';
import { useQuery } from '@tanstack/react-query';
import { QueriesKeysEnum } from '@src/configs/QueriesConfig';
import { fetchProductTemplate } from '@src/services/ProductTemplateService';
import { useMemo } from 'react';
import { Spin } from 'antd';
import WriteReview from './WriteReview';
import SellerReview from './SellerReview';

const index = () => {
  const { templateId, productId } = useParams();

  const { data: productTemplateDetails, isFetching } = useQuery({
    queryKey: [QueriesKeysEnum.PRODUCTS_TEMPLATE, templateId],
    queryFn: async () => fetchProductTemplate(templateId || ''),
    initialData: null
  });

  const mainProduct =
    useMemo(
      () =>
        productTemplateDetails?.products.find(
          (product) =>
            product?.variant?.id === productId || product.id === productId
        ),
      [productTemplateDetails, productId]
    ) || null;

  if (isFetching) return <Spin />;

  return (
    <Routes>
      <Route
        index
        element={
          <ProductDetails
            productTemplateDetails={productTemplateDetails}
            mainProduct={mainProduct}
            productId={productId}
          />
        }
      />
      {mainProduct && (
        <Route
          path='seller-review/*'
          element={<SellerReview vendorId={mainProduct.userId} />}
        />
      )}
    </Routes>
  );
};

export default index;
