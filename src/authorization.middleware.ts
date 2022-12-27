import { Request, Response, NextFunction } from 'express';

export function authorizationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if ('user' in req) {
    return next();
  }
  res.json({
    statusCode: 401,
    message: `Cannot ${req.method} ${req.url}`,
    error: 'Not Authorized',
  });
}
