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
  business: {
    name: string;
    licenseNo: string;
    commercialLicenseIssueDate: string;
    commercialLicenseExpiryDate: string;
    commercialLicenseIssuingAuthority: string;
    commercialLicenseActivites: string;
    ownerType: string;
    emiratesId: string;
    emiratesIdIssueDate: string;
    emiratesIdExpiryDate: string;
    description: string;
    logo: string;
  };
  deviceTokens: string[];
  emailSubscription: boolean;
  smsSubscription: boolean;
  createdAt: number;
  updatedAt: number;
  productSold: number;
  productCount: number;
}
