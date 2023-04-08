export interface ReviewType {
    id: string;
    userId?: string;
    userName: string;
    message: string;
    rating: number;
    createdAt: number;
    userIcon: string; 
    orderId?: string;
    orderNo?: string;
    itemId?: string;
    itemName?: string;
    vendorId?: string;
    vendorName?: string;
    title?: string;
    files?: string[];
}