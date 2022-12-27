import * as JWT from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

type JWTPayload = {
  id: string;
};

export function signJWT({ id }: JWTPayload): string {
  return JWT.sign({ id }, JWT_SECRET, {
    expiresIn: '72h',
  });
}

export function decodeJWT(token: string): Record<string, any> | false {
  try {
    const user = JWT.verify(token, JWT_SECRET);
    return user;
  } catch (e) {
    return false;
  }
}
