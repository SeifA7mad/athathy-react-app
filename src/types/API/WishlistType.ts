import { ProductType } from "./ProductType";

export interface WishlistProductsType {
    items: {
        id: string;
        productTemplate: ProductType;
        images: string[];
        mrpPrice: number;
        price: number;
        name: string;
        stock: string;
        thumbnails: string[];
        vendorName: string;
    }[];
    discountTotal: number;
    mrpTotal: number;
    priceTotal: number;
}