export interface VendorType {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerified: boolean;
  phone: string;
  status: string;
  groups: [];
  tdsEnabled: boolean;
  commission: number;
  pickupLocations: {
    name: string;
    email: string;
    phone: number;
    address: string;
    city: string;
    state: string;
    country: string;
  }[];
  documents: {
    id: string;
    files: string[];
    isVerified: boolean;
  }[];
  deviceTokens: string[];
  emailSubscription: boolean;
  smsSubscription: boolean;
  createdAt: number;
  updatedAt: number;
}
