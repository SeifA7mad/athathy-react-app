const API_ENDPOINT_URL: {
  [key in string]: string;
} = {
  development: 'https://api.athathy.ae/api/v1/',
  production: '',
  test: ''
};

const getEnv = () => {
  const env = process.env.NODE_ENV || 'development';
  return { API_ENDPOINT_URL: API_ENDPOINT_URL[env] };
};

export const env = getEnv();
