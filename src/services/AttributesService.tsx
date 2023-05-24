import fetch from '@src/utils/FetchInterceptor';

type AttributeType = {
  id: string;
  name: string;
  values: { id: string; value: string }[];
};

const api = 'attributes';

export const fetchAttributes = async () => {
  const response = await fetch({
    url: `${api}/public`,
    method: 'GET'
  });
  return response.data as AttributeType[];
};
