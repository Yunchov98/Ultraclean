export interface JobRequest {
  _id: string;
  _ownerId: string | undefined;
  comments: string;
  email: string;
  firstName: string;
  lastCompany: string;
  lastName: string;
  portfolio: string;
  salary: number;
  startDate: string;
  createAt: string;
}
