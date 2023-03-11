export interface CustomerProfileType {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerified: boolean;
  status: string;
  address: [];
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
