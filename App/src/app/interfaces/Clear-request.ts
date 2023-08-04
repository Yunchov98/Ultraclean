import { Service } from './Service';

export interface ClearRequest {
  _id: string;
  _ownerId: string | undefined;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string | null;
  services: Service[];
}
