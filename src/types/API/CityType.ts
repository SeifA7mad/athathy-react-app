export interface CityType {
  id: string;
  countryId: string;
  countryName: string;
  stateId: string;
  stateName: string;
  districtId: string;
  districtName: string;
  name: string;
  priority: number;
  status: string;
  createdAt: number;
  updatedAt: number;
}

export interface DistrictType {
  id: string;
  countryId: string;
  countryName: string;
  stateId: string;
  stateName: string;
  name: string;
  priority: number;
  status: string;
  createdAt: number;
  updatedAt: number;
}
