import { useParams } from 'react-router-dom';
import ProductDetails from './ProductDetails';
import { useQuery } from '@tanstack/react-query';
import { QueriesKeysEnum } from '@src/configs/QueriesConfig';
import { fetchProductTemplate } from '@src/services/ProductTemplateService';
import { useMemo } from 'react';
import { Spin } from 'antd';

// type AttributeCategory = {
//   label: string; // attribute value (could be red, green, wood, fibre, etc.)
//   id: string; // variant id
// };

type AttributeVariants = {
  [key: string]: string[]; // red: [variantId1, variantId2, ...]
};

export type AttributeVariantsType = Record<string, AttributeVariants>;

const index = () => {
  const { templateId, productId } = useParams();

  const { data: productTemplateDetails, isFetching } = useQuery({
    queryKey: [QueriesKeysEnum.PRODUCTS_TEMPLATE, templateId],
    queryFn: async () => fetchProductTemplate(templateId || ''),
    initialData: null
  });

  const attributesVariants: AttributeVariantsType = {};

  productTemplateDetails?.variants.forEach((item) => {
    item.attributes.forEach((attribute) => {
      // attribute name (could be color, material, etc.)
      if (!attributesVariants[attribute.name]) {
        attributesVariants[attribute.name] = {};
      }
      // attribute value (could be red, green, wood, fibre, etc.)
      if (!attributesVariants[attribute.name][attribute.value.value]) {
        attributesVariants[attribute.name][attribute.value.value] = [];
      }
      attributesVariants[attribute.name][attribute.value.value].push(item.id);
    });
  });

  console.log(attributesVariants, 'attributesVariants');

  // const attributesCategories: Record<string, AttributeCategory[]> = {};
  // productTemplateDetails?.variants.forEach((item) => {
  //   item.attributes.forEach((attribute) => {
  //     if (!attributesCategories[attribute.name]) {
  //       attributesCategories[attribute.name] = [];
  //     }
  //     attributesCategories[attribute.name].push({
  //       label: attribute.value.value,
  //       id: item.id
  //     });
  //   });
  // });

  // console.log(attributesCategories);

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
    <ProductDetails
      productTemplateDetails={productTemplateDetails}
      mainProduct={mainProduct}
      productId={productId}
    />
  );
};

export default index;
