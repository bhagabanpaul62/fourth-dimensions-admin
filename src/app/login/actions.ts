'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import * as bcrypt from 'bcryptjs';
import { encrypt } from '@/lib/session';

export async function login(prevState: { error: string | undefined }, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Email and password are required.' };
  }
  
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!adminEmail || !adminPasswordHash) {
    console.error('Admin credentials are not set in .env file.');
    return { error: 'Server configuration error.' };
  }
  
  const isEmailCorrect = email.toLowerCase() === adminEmail.toLowerCase();
  const isPasswordCorrect = await bcrypt.compare(password, adminPasswordHash);

  if (isEmailCorrect && isPasswordCorrect) {
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    const session = await encrypt({ user: { email: adminEmail }, expires });

    cookies().set('session', session, { expires, httpOnly: true });
    
    redirect('/');
  }

  return { error: 'Invalid email or password.' };
}

export async function logout() {
  cookies().set('session', '', { expires: new Date(0) });
  redirect('/login');
}
