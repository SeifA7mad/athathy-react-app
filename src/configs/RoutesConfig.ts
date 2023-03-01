import { RouteKeys } from '@src/types/RouteKeys';

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
export const publicRoutes: RouteConfig[] = [];

// This is the array of routes that are private
export const privateRoutes: RouteConfig[] = [];

export enum RouteKeysEnum {
  Categories = 'Categories'
}

export type RouteKeysType = keyof typeof RouteKeysEnum;
