import { CleaningRequest } from './Cleaning-request';

export interface RejectedRequest extends CleaningRequest {
  rejectedAt: string;
}
