import { Service } from './Service';

export interface CleaningRequest {
  _id: string;
  _ownerId: string | undefined;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string | null;
  services: Service[];
  createdAt: string;
  totalPrice: number;
}
