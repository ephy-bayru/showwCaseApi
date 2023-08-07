import { Request } from 'express';
import { IAuthPayload } from '../data/interfaces/IAuth';

export interface CustomRequest extends Request {
  user?: IAuthPayload;
}