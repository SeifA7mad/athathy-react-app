import { env } from './EnvironmentConfig';

export const APP_NAME = 'Athathy';
export const API_BASE_URL = env.API_ENDPOINT_URL;
export const APP_PREFIX_PATH = '';
export const APP_IN_PRODUCTION = process.env.NODE_ENV === 'production';
