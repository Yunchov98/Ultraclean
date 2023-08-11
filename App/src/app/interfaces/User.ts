import { Service } from './Service';

export interface User {
  _id: string | undefined;
  email: string | undefined | null;
  token: string;
  currentOrder: Service[];
  myOrders: Service[];
  isAdmin: boolean;
}
