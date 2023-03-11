import {
  BrandType,
  CategoryType,
  ProductType
} from '@src/types/API/ProductType';
import fetch from '@src/utils/FetchInterceptor';

const api = 'products';

export const fetchProducts = async (
  params?: URLSearchParams
): Promise<{
  data: ProductType[];
  total: number;
  brands: BrandType[];
  categories: CategoryType[];
}> => {
  const response = (await fetch({
    url: `${api}/public`,
    method: 'GET',
    params
  })) as {
    data: ProductType[];
    total: number;
    brands: BrandType[];
    categories: CategoryType[];
  };
  return response;
};

export const fetchProduct = async (
  id: string,
  params?: URLSearchParams
): Promise<ProductType> => {
  const response = await fetch({
    url: `${api}/${id}/public`,
    method: 'GET',
    params
  });
  return response.data;
};
