import ListingLayout from '@src/components/page-content/products/listing/ListingLayout';
import ProductsList from '@src/components/page-content/products/listing/ProductsList';
import { DEFAULT_PAGE_SIZE, QueriesKeysEnum } from '@src/configs/QueriesConfig';
import usePagination from '@src/hooks/usePagination';
import { fetchProducts } from '@src/services/ProductService';
import { useQuery } from '@tanstack/react-query';
import { Spin } from 'antd';
import { useParams, useSearchParams } from 'react-router-dom';

const CategoryListing = () => {
  const { categoryId = '', categoryName = '' } = useParams();
  const [queryParams] = useSearchParams();

  const pagination = usePagination({
    queryParams
  });

  if (categoryId !== queryParams.get('categoryId')) {
    queryParams.set('categoryId', categoryId);
  }

  const { data: productsData, isFetching } = useQuery({
    queryKey: [QueriesKeysEnum.PRODUCTS, queryParams.toString()],
    queryFn: async () => fetchProducts(new URLSearchParams(queryParams)),
    initialData: null
  });

  return (
    <ListingLayout pagination={pagination} title={categoryName}>
      <ProductsList products={productsData?.data} isFetching={isFetching} />
    </ListingLayout>
  );
};

export default CategoryListing;
