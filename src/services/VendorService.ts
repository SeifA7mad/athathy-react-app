import {
  VendorMakeContactRequestType,
  VendorType
} from '@src/types/API/VendorType';
import fetch from '@src/utils/FetchInterceptor';

const api = 'vendors';

export const fetchVendor = async (id: string) => {
  const response = await fetch({
    url: `${api}/${id}/public`,
    method: 'GET'
  });
  return response.data as VendorType;
};

export const vendorMakeContactRequest = async (
  data: VendorMakeContactRequestType
) => {
  const response = await fetch({
    url: `contact-request/submit`,
    method: 'POST',
    data
  });
  return response.data;
};
