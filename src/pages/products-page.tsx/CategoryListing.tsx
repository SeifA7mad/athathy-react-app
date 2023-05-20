import ListingLayout from '@src/components/page-content/products/listing/ListingLayout';
import ProductsList from '@src/components/page-content/products/listing/ProductsList';
import { QueriesKeysEnum } from '@src/configs/QueriesConfig';
import usePagination from '@src/hooks/usePagination';
import { fetchProducts } from '@src/services/ProductService';
import { useQuery } from '@tanstack/react-query';
import { useParams, useSearchParams } from 'react-router-dom';
import Subcategories from '../../components/page-content/products/listing/Subcategories';

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
    <ListingLayout
      total={productsData?.total}
      pagination={pagination}
      title={categoryName}
    >
      <Subcategories
        id={categoryId}
        subcategories={productsData?.categories}
        isFetching={isFetching}
      />
      <ProductsList products={productsData?.data} isFetching={isFetching} />
    </ListingLayout>
  );
};

export default CategoryListing;
