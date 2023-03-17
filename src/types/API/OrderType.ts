export type paymentMethodType = 'Online' | 'Cod';

export interface RequestOrderType {
  items?: {
    id: string;
    quantity: number;
  }[];
  fromCart: boolean;
  shippingAddressId: string;
  billingAddressId: string;
  prescriptions?: string[];
  couponCode?: string;
  paymentMethod: paymentMethodType;
  razorPayAccountType?: 'RazorPay Normal' | 'RazorPay Axis';
  stripeToken?: string;
  useWalletBalance: boolean;
}
