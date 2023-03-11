import { lazy } from 'react';
import { UNAUTHENTICATED_ENTRY } from './AppConfig';

export enum RouteKeysEnum {
  home = 'home',
  category = 'category',
  aboutUs = 'about-us',
  products = 'products',
  cart = 'cart',
  auth = 'auth',
  productDetails = 'product-details',
  dashboard = 'dashboard'
}

export type RouteKeys = keyof typeof RouteKeysEnum;

export enum RouteDashboardKeysEnum {
  profile = 'profile',
  orders = 'orders',
  returns = 'returns',
  address = 'address',
  password = 'password'
}

export type RouteDashboardKeys = keyof typeof RouteDashboardKeysEnum;

// This is the interface of the routes config object
export interface RouteConfig {
  key: RouteKeys;
  path: string;
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  meta?: {
    [key: string]: any;
  };
}

// This is the array of routes that are public
export const publicRoutes: RouteConfig[] = [
  {
    key: 'home',
    path: '/',
    component: lazy(() => import('@src/pages/Home'))
  },
  {
    key: 'category',
    path: `/${RouteKeysEnum.category}/*`,
    component: lazy(() => import('@src/pages/category-page.tsx'))
  },
  {
    key: 'products',
    path: `/${RouteKeysEnum.products}/*`,
    component: lazy(() => import('@src/pages/products-page.tsx'))
  },
  {
    key: 'auth',
    path: `${UNAUTHENTICATED_ENTRY}`,
    component: lazy(() => import('@src/pages/fallback/Auth'))
  }
];

// This is the array of routes that are private
export const privateRoutes: RouteConfig[] = [
  {
    key: 'cart',
    path: '/cart',
    component: lazy(() => import('@src/pages/Cart'))
  },
  {
    key: 'productDetails',
    path: `/${RouteKeysEnum.productDetails}/:templateId/:productId`,
    component: lazy(() => import('@src/pages/ProductDetails'))
  },
  {
    key: 'dashboard',
    path: `/${RouteKeysEnum.dashboard}/*`,
    component: lazy(() => import('@src/pages/dashboard.tsx'))
  }
];
