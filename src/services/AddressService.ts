import { CityType, DistrictType } from '@src/types/API/CityType';
import fetch from '@src/utils/FetchInterceptor';

export const fetchActiveCities = async (
  params?: URLSearchParams
): Promise<CityType[]> => {
  const response = await fetch({
    url: `city/public`,
    method: 'GET',
    params: {
      status: 'Active',
      orderByPriority: true,
      ...params
    }
  });
  return response.data;
};

export const fetchActivePincodes = async (
  params?: URLSearchParams
): Promise<CityType[]> => {
  const response = await fetch({
    url: `pincode/public`,
    method: 'GET',
    params: {
      status: 'Active',
      orderByPriority: true,
      ...params
    }
  });
  return response.data;
};

export const fetchActiveDistrict = async (params?: URLSearchParams) => {
  const response = await fetch({
    url: `district/public`,
    method: 'GET',
    params: {
      status: 'Active',
      orderByPriority: true,
      ...params
    }
  });
  return response.data as DistrictType[];
};
