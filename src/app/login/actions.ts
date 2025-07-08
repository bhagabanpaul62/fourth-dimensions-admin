'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { encrypt } from '@/lib/session';

export async function login(prevState: any, formData: FormData) {
  const password = formData.get('password');

  // IMPORTANT: In a real app, you would hash and compare passwords from a database.
  if (password === process.env.ADMIN_PASSWORD) {
    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    const session = await encrypt({ user: { name: 'Admin' }, expires });

    cookies().set('session', session, { expires, httpOnly: true, path: '/' });
    redirect('/');
  } else {
    return { message: 'Invalid password. Please try again.' };
  }
}

export async function logout() {
  // Clear the session cookie
  cookies().set('session', '', { expires: new Date(0), path: '/' });
  redirect('/login');
}
