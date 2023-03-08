export enum QueriesKeysEnum {
  CATEGORIES = 'CATEGORIES',
  MAIN_CATEGORIES = 'MAIN_CATEGORIES',
  PRODUCTS = 'PRODUCTS',
  CITIES = 'CITIES',
  HOME_WIDGETS = 'HOME_WIDGETS',
  CART = 'CART'
}

export type QueriesKeys = keyof typeof QueriesKeysEnum;

export const DEFAULT_PAGE_SIZE = 10;
