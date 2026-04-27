export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string | null;
  provider: string;
  providerId: string;
  phone: string | null;
  zipcode: string | null;
  address: string | null;
  addressDetail: string | null;
  createdAt: Date;
  updatedAt: Date;
}
