import ListingLayout from '@src/components/page-content/products/listing/ListingLayout';
import ProductsList from '@src/components/page-content/products/listing/ProductsList';
import { DEFAULT_PAGE_SIZE, QueriesKeysEnum } from '@src/configs/QueriesConfig';
import usePagination from '@src/hooks/usePagination';
import { fetchProducts } from '@src/services/ProductService';
import { useQuery } from '@tanstack/react-query';
import { Spin } from 'antd';
import { useParams, useSearchParams } from 'react-router-dom';

const SearchListing = () => {
  const { searchText = '' } = useParams();
  const [queryParams] = useSearchParams();

  const pagination = usePagination({
    queryParams
  });

  if (
    queryParams.get('search') !== searchText &&
    queryParams.get('search') !== ''
  ) {
    queryParams.set('search', searchText);
  }

  if (!queryParams.get('page')) {
    queryParams.set('page', '1');
    queryParams.set('limit', DEFAULT_PAGE_SIZE.toString());
  }

  const { data: productsData, isFetching } = useQuery({
    queryKey: [QueriesKeysEnum.PRODUCTS, queryParams.toString()],
    queryFn: async () => fetchProducts(new URLSearchParams(queryParams)),
    initialData: null
  });

  return (
    <ListingLayout
      title={`Results for “${searchText}”`}
      pagination={pagination}
    >
      <ProductsList products={productsData?.data} isFetching={isFetching} />
    </ListingLayout>
  );
};

export default SearchListing;
