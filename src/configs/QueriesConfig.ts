export enum QueriesKeysEnum {
  CATEGORIES = 'CATEGORIES',
  MAIN_CATEGORIES = 'MAIN_CATEGORIES',
  PRODUCTS = 'PRODUCTS',
  CITIES = 'CITIES',
  HOME_WIDGETS = 'HOME_WIDGETS',
  CART = 'CART',
  WISH_LIST = 'WISH_LIST',
  CUSTOMER_PROFILE = 'CUSTOMER_PROFILE'
}

export type QueriesKeys = keyof typeof QueriesKeysEnum;

export const DEFAULT_PAGE_SIZE = 10;
