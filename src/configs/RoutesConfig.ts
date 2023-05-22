import { lazy } from 'react';
import { APP_PREFIX_PATH, UNAUTHENTICATED_ENTRY } from './AppConfig';
import path from 'path';

export enum RouteKeysEnum {
  home = 'home',
  category = 'category',
  aboutUs = 'about-us',
  products = 'products',
  cart = 'cart',
  auth = 'auth',
  productDetails = 'product-details',
  dashboard = 'dashboard',
  checkout = 'checkout',
  information = 'information',
  vendorPortal = 'vendor-portal',
  writeReview = 'write-review'
}

export type RouteKeys = keyof typeof RouteKeysEnum;

export enum RouteDashboardKeysEnum {
  profile = 'profile',
  orders = 'orders',
  returns = 'returns',
  address = 'address',
  password = 'password',
  support = 'support',
  favorites = 'favorites'
}

export enum RouteCategoriesKeysEnum {
  topCategories = 'top-categories'
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
    path: `${APP_PREFIX_PATH}/`,
    component: lazy(() => import('@src/pages/Home'))
  },
  {
    key: 'category',
    path: `${APP_PREFIX_PATH}/${RouteKeysEnum.category}/*`,
    component: lazy(() => import('@src/pages/category-page.tsx'))
  },
  {
    key: 'products',
    path: `${APP_PREFIX_PATH}/${RouteKeysEnum.products}/*`,
    component: lazy(() => import('@src/pages/products-page.tsx'))
  },
  {
    key: 'productDetails',
    path: `${APP_PREFIX_PATH}/${RouteKeysEnum.productDetails}/:templateId/:productId/*`,
    component: lazy(() => import('@src/pages/product-details.tsx'))
  },
  {
    key: 'auth',
    path: `${APP_PREFIX_PATH}/:path/${UNAUTHENTICATED_ENTRY}`,
    component: lazy(() => import('@src/pages/fallback/Auth'))
  },
  {
    key: 'information',
    path: `${APP_PREFIX_PATH}/${RouteKeysEnum.information}/:id`,
    component: lazy(() => import('@src/pages/Information'))
  },
  {
    key: 'vendorPortal',
    path: `${APP_PREFIX_PATH}/${RouteKeysEnum.vendorPortal}`,
    component: lazy(() => import('@src/pages/VendorPortal'))
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
    key: 'dashboard',
    path: `${APP_PREFIX_PATH}/${RouteKeysEnum.dashboard}/*`,
    component: lazy(() => import('@src/pages/dashboard.tsx'))
  },
  {
    key: 'checkout',
    path: `${APP_PREFIX_PATH}/${RouteKeysEnum.checkout}`,
    component: lazy(() => import('@src/pages/Checkout'))
  },
  {
    key: 'writeReview',
    path: `${APP_PREFIX_PATH}/${RouteKeysEnum.writeReview}/:orderId/:productId`,
    component: lazy(() => import('@src/pages/WriteReview'))
  }
];
