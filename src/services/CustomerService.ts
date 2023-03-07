import fetch from '@src/utils/FetchInterceptor';

const api = 'customers';

export const register = (data: {
  firstName: string;
  lastName: string;
  displayImage?: string;
  token: string;
}) => {
  return fetch({
    url: `${api}/register`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${data.token}`
    },
    data
  });
};
