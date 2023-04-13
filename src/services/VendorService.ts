import { VendorType } from '@src/types/API/VendorType';
import fetch from '@src/utils/FetchInterceptor';

const api = 'vendors';

export const fetchVendor = async (id: string) => {
  const response = await fetch({
    url: `${api}/${id}/public`,
    method: 'GET'
  });
  return response.data as VendorType;
};
