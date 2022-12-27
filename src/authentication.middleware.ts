import { Request, Response, NextFunction } from 'express';
import { decodeJWT } from './user/utils';

export function authenticationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { authorization = '' } = req.headers;
  const user = decodeJWT(authorization.replace('Bearer ', ''));
  if (user && user.id) {
    req['user'] = user;
  }
  next();
}
