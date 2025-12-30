export interface IRider {
  name: string;
  age: number;
  email: string;
  drivingLicenseNumber: string;
  region: string;
  district: string;
  nid: string;
  contact: string;
  bikeBrandModel: string;
  status: 'pending' | 'approved' | 'rejected';
  bikeRegistrationNumber: string;
  aboutBikerYourSelf: string;
}
