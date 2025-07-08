'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import * as bcrypt from 'bcryptjs';
import { encrypt } from '@/lib/session';

export async function login(prevState: { error: string | undefined }, formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  if (!username || !password) {
    return { error: 'Username and password are required.' };
  }
  
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!adminUsername || !adminPasswordHash) {
    console.error('Admin credentials are not set in .env file.');
    return { error: 'Server configuration error.' };
  }
  
  const isUsernameCorrect = username.toLowerCase() === adminUsername.toLowerCase();
  const isPasswordCorrect = await bcrypt.compare(password, adminPasswordHash);

  if (isUsernameCorrect && isPasswordCorrect) {
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    const session = await encrypt({ user: { username: adminUsername }, expires });

    cookies().set('session', session, { expires, httpOnly: true });
    
    redirect('/');
  }

  return { error: 'Invalid username or password.' };
}

export async function logout() {
  cookies().set('session', '', { expires: new Date(0) });
  redirect('/login');
}
