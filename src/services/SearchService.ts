import fetch from '@src/utils/FetchInterceptor';

const api = '';

export const search = (params: URLSearchParams) => {
  return fetch({
    url: `${api}/fetch`,
    method: 'GET',
    params
  });
};
