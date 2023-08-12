import { AcceptedRequest } from './Accepted-request';

export interface FinishedRequest extends AcceptedRequest {
  finishedAt: string;
}
