export interface Service {
  _id: string;
  ownerId: string | undefined;
  service: string;
  imageUrl: string;
  price: number;
  description: string;
}
