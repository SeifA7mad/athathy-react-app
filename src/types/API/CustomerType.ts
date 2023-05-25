export interface CustomerAddressType {
  id: string;
  name: string;
  lastName: string;
  line1: string;
  line2?: string;
  city: string;
  floor: string;
  state: string;
  phone: string;
  addressType: 'Home' | 'Apartment' | 'Office';
  houseNo: string;
  buildingNo: string;
  company: string;
  zipcode: string;
  country: string;
  primary: boolean;
}

export interface CustomerProfileType {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerified: boolean;
  status: string;
  address: CustomerAddressType[];
  groups: [];
  emailSubscription: boolean;
  smsSubscription: boolean;
  deviceTokens: string[];
  createdAt: number;
  updatedAt: number;
}

export interface CustomerUpdateProfileType
  extends Partial<
    Omit<
      CustomerProfileType,
      | 'id'
      | 'email'
      | 'address'
      | 'status'
      | 'emailVerified'
      | 'deviceTokens'
      | 'createdAt'
      | 'updatedAt'
    >
  > {}

export interface CustomerAddNewAddressType
  extends Omit<CustomerAddressType, 'id'> {
  name: string;
  lastName: string;
  line1: string;
  line2?: string;
  landmark?: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  zipcode: string;
  primary: boolean;
}
