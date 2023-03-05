export enum QueriesKeysEnum {
  CATEGORIES = 'CATEGORIES',
  MAIN_CATEGORIES = 'MAIN_CATEGORIES',
  PRODUCTS = 'PRODUCTS'
}

export type QueriesKeys = keyof typeof QueriesKeysEnum;
