import { ProductType } from './ProductType';

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
  ProductTemplates: Omit<ProductType, 'price' | 'mrpPrice' | 'bulkPrice'> & {
    minQty: number;
    slug: string;
    lowestPriceProduct: {
      id: string;
      mrpPrice: number;
      price: number;
    };
    highestPriceProduct: {
      id: string;
      mrpPrice: number;
      price: number;
    };
    products: ProductType[];
  };
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
