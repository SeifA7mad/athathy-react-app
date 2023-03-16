const API_ENDPOINT_URL: {
  [key in string]: string;
} = {
  development: 'https://api.athathy.ae/api/v1/',
  production: 'https://api.athathy.ae/api/v1/',
  test: 'https://api.athathy.ae/api/v1/'
};

const STRIPE_API: {
  [key in string]: string;
} = {
  development: 'sk_test_4eC39HqLyjWDarjtT1zdp7dc',
  production: 'sk_test_4eC39HqLyjWDarjtT1zdp7dc',
  test: 'sk_test_4eC39HqLyjWDarjtT1zdp7dc'
};

const getEnv = () => {
  const env = process.env.NODE_ENV || 'development';
  return { API_ENDPOINT_URL: API_ENDPOINT_URL[env], STRIPE_KEY: STRIPE_API[env] };
};

export const env = getEnv();
