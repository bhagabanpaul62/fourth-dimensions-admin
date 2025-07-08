import { NextRequest, NextResponse } from 'next/server';
import { getSession, updateSession } from '@/lib/session';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get session from cookie
  const session = await getSession();

  const isLoginPage = pathname.startsWith('/login');

  if (isLoginPage) {
    // If the user is already logged in and tries to access login page,
    // redirect them to the dashboard.
    if (session) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  // If there's no session, redirect to the login page.
  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If there is a session, continue to the requested page.
  // Optionally, you can update the session to refresh its expiration time.
  return await updateSession(request);
}

export const config = {
  // Do not run middleware on static files or API routes
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
