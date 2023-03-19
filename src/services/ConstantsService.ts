import fetch from '@src/utils/FetchInterceptor';

const api = 'constants';

export const fetchAPIConstants = () => {
  return fetch({
    url: `${api}`,
    method: 'GET'
  });
};
