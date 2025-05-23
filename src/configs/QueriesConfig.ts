export enum QueriesKeysEnum {
  CATEGORIES = 'CATEGORIES',
  MAIN_CATEGORIES = 'MAIN_CATEGORIES',
  PRODUCTS = 'PRODUCTS',
  PRODUCTS_TEMPLATE = 'PRODUCTS_TEMPLATE',
  CITIES = 'CITIES',
  HOME_WIDGETS = 'HOME_WIDGETS',
  CART = 'CART',
  WISH_LIST = 'WISH_LIST',
  CUSTOMER_PROFILE = 'CUSTOMER_PROFILE',
  STATES = 'STATES',
  PINCODES = 'PINCODES',
  CUSTOMER_ORDERS = 'CUSTOMER_ORDERS',
  CUSTOMER_RETURNS = 'CUSTOMER_RETURNS',
  CONSTANTS = 'CONSTANTS',
  TICKETS = 'TICKETS',
  ORDERS = 'ORDERS',
  REVIEWS = 'REVIEWS',
  VENDORS = 'VENDORS',
  INFORMATION = 'INFORMATION',
  COLOR = 'COLOR',
  MATERIAL = 'MATERIAL',
  ATTRIBUTES = 'ATTRIBUTES'
}

export type QueriesKeys = keyof typeof QueriesKeysEnum;

export const DEFAULT_PAGE_SIZE = 10;
