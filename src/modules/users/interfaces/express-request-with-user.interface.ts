import { Request as ExpressRequest } from 'express';
import { UserPayload } from './users-login.interface';

export interface ExpreesRequestWithUser extends ExpressRequest {
  user: UserPayload & { iat: number; exp: number };
}
