export interface BrandType {
  id: string;
  name: string;
  status: string;
}

export interface CategoryType {
  id: string;
  name: string;
  status: string;
}

interface ShippingDetailsType {
  lengthClass: string;
  weightClass: string;
  height: number;
  length: number;
  width: number;
  weight: number;
}

interface variantType {
  id: string;
  name: string;
  displayName: string;
  description: 'testv';
  thumbnails: string[];
  images: string[];
  attributes: {
    id: string;
    name: string;
    status: string;
    value: {
      id: string;
      value: string;
    };
  }[];

  createdAt: number;
  updatedAt: number;
}

export interface ProductType {
  id: string;
  productTemplateId: string;
  name: string;
  description: string;
  productCode: string;
  hsn: number;
  thumbnails: string[];
  images: string[];
  brand: BrandType;
  category: CategoryType;
  categoryTree: [];
  medicinePackaging: string;
  allowedPaymentTypes: ['Online', 'Cod'];
  returnable: boolean;
  productType: string;
  acquirementMethod: string;
  subscriptionPrice: number[];
  mrpPrice: number;
  price: number;
  bulkPrice: number[];
  userId: string;
  username: string;
  deliveryZone: {
    id: string;
    name: string;
    status: string;
  };
  status: string;
  productTemplateStatus: string;
  approval: string;
  commission: number;
  qty: number;
  isUnlimited: boolean;
  allowedQuantityPerOrder: number;
  prescriptionRequired: boolean;
  shippingDetail: ShippingDetailsType;
  taxCategory: {
    id: string;
    name: string;
    taxes: any[];
    status: string;
    createdAt: number;
    updatedAt: number;
  };
  composition: any[];
  variant: variantType;
  createdAt: number;
  updatedAt: number;
}

export interface ProductTemplateType {
  id: string;
  name: string;
  description: string;
  images: string[];
  status: string;
  productType: string;
  brand: BrandType;
  category: CategoryType;
  products: ProductType[];
  returnable: boolean;
  returnPeriod: number;
  allowedQuantityPerOrder: number;
  prescriptionRequired: boolean;
  variants: variantType[];
  shippingDetail: ShippingDetailsType;
  medicinePackaging: string;
  minQty: number;
  composition: string[];
  keywords: string[];
  slug: string;
  tags: string[];
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
  createdAt: number;
  updatedAt: number;
}
