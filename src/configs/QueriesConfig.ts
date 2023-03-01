export enum QueriesKeysEnum {
  CATEGORIES = 'CATEGORIES',
  MAIN_CATEGORIES = 'MAIN_CATEGORIES'
}

export type QueriesKeys = keyof typeof QueriesKeysEnum;
