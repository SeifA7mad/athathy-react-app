import { ProductTemplateType } from '@src/types/API/ProductType';
import fetch from '@src/utils/FetchInterceptor';

const api = 'producttemplates';

export const fetchProductTemplate = async (id: string) => {
  const response = await fetch({
    url: `${api}/${id}/public`,
    method: 'GET'
  });
  return response.data as ProductTemplateType;
};
