export enum QueriesKeysEnum {
  CATEGORIES = 'CATEGORIES',
  MAIN_CATEGORIES = 'MAIN_CATEGORIES',
  PRODUCTS = 'PRODUCTS',
  CITIES = 'CITIES'
}

export type QueriesKeys = keyof typeof QueriesKeysEnum;
