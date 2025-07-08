import { SignJWT, jwtVerify } from 'jose';

export async function encrypt(payload: any) {
  const secretKey = process.env.SESSION_SECRET;
  if (!secretKey) {
    throw new Error('SESSION_SECRET is not set in the environment');
  }
  const key = new TextEncoder().encode(secretKey);
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h') // Session expires in 1 hour
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const secretKey = process.env.SESSION_SECRET;
  if (!secretKey) {
    return null;
  }
  const key = new TextEncoder().encode(secretKey);
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (e) {
    return null;
  }
}
