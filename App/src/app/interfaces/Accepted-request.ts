import { CleaningRequest } from './Cleaning-request';

export interface AcceptedRequest extends CleaningRequest {
  acceptedAt: string;
}
