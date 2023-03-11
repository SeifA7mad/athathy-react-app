import { ProductTemplateType, ProductType } from './ProductType';

export type WidgetListingType =
  | 'Brands'
  | 'MainBanner'
  | 'Banner'
  | 'Categories'
  | 'ProductTemplates'
  | 'Products'
  | 'Static';

interface BannerType {
  id: string;
  name: string;
  image: string;
  mobileImage: string;
  priority: number;
  status: string;
  createdAt: number;
  updatedAt: number;
}
export interface ListingItemsType {
  MainBanner: BannerType;
  ProductTemplates: ProductTemplateType;
  Banner: BannerType;
  Categories: {
    id: string;
    name: string;
    image: string;
    parentId: string;
    level: number;
    status: string;
    createdAt: number;
    updatedAt: number;
  };
}

export interface HomeListing {
  id: string;
  tabTitle: string;
  isTitleShow: boolean;
  priority: number;
  numberOfItems: number;
  listingPlatform: ['Mobile', 'Web'];
  listingType: keyof ListingItemsType;
  listingItems: ListingItemsType[keyof ListingItemsType][];
  slug: string;
  status: string;
  startDate: string;
  endDate: string;
  createdAt: number;
  updatedAt: number;
}
