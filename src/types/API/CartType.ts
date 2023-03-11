import { ProductTemplateType } from './ProductType';

export interface CartProductsType {
  userId: string;
  items: {
    product: {
      id: string;
      productTemplate: ProductTemplateType;
      images: string[];
      mrpPrice: number;
      price: number;
      name: string;
      stock: string;
      thumbnails: string[];
      vendorName: string;
    };
    quantity: number;
  }[];
  discountTotal: number;
  mrpTotal: number;
  priceTotal: number;
}
