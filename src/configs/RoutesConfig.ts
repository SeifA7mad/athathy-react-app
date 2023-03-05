import { lazy } from 'react';

export enum RouteKeysEnum {
  home = 'home',
  category = 'category',
  aboutUs = 'about-us'
}

export type RouteKeys = keyof typeof RouteKeysEnum;


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
    component: lazy(() => import('@src/pages/Home')),
  },
    {
    key: 'category',
    path: `/${RouteKeysEnum.category}/*`,
    component: lazy(() => import('@src/pages/category-page.tsx')),
  }
];

// This is the array of routes that are private
export const privateRoutes: RouteConfig[] = [
  
];


