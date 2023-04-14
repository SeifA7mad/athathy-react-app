import { InformationType } from '@src/types/API/InformationType';
import fetch from '@src/utils/FetchInterceptor';

const api = 'information';

export const fetchInformation = async (params?: URLSearchParams) => {
  const response = await fetch({
    url: `${api}/public`,
    method: 'GET',
    params
  });
  return response.data as InformationType[];
};

export const fetchInformationById = async (
  id: string,
  params?: URLSearchParams
) => {
  const response = await fetch({
    url: `${api}/${id}/public`,
    method: 'GET',
    params
  });
  return response.data as InformationType;
};
