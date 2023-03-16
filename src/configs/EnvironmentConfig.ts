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
  development:
    'pk_test_51MmFjiSE8oHisq8KJ4U750AqpJNgwd3ddYgkJNRFr3mATmZgw0TpSdDVIGEXIokKWiPGGdLq2C6hQ1z7g2D8xQbI00ZwOR9lzd',
  production:
    'pk_test_51MmFjiSE8oHisq8KJ4U750AqpJNgwd3ddYgkJNRFr3mATmZgw0TpSdDVIGEXIokKWiPGGdLq2C6hQ1z7g2D8xQbI00ZwOR9lzd',
  test: 'pk_test_51MmFjiSE8oHisq8KJ4U750AqpJNgwd3ddYgkJNRFr3mATmZgw0TpSdDVIGEXIokKWiPGGdLq2C6hQ1z7g2D8xQbI00ZwOR9lzd'
};

const getEnv = () => {
  const env = process.env.NODE_ENV || 'development';
  return {
    API_ENDPOINT_URL: API_ENDPOINT_URL[env],
    STRIPE_KEY: STRIPE_API[env]
  };
};

export const env = getEnv();
