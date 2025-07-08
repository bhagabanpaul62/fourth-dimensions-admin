import { NextResponse, type NextRequest } from 'next/server';
import { decrypt } from '@/lib/session';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isLoginPage = path.startsWith('/login');

  const sessionCookie = request.cookies.get('session')?.value;

  // Redirect to login if not authenticated and not on the login page
  if (!sessionCookie && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (sessionCookie) {
    const session = await decrypt(sessionCookie);
    // If authenticated, redirect away from login page
    if (session && isLoginPage) {
        return NextResponse.redirect(new URL('/', request.url));
    }
    // If cookie is invalid, redirect to login and clear the cookie
    if (!session && !isLoginPage) {
        const response = NextResponse.redirect(new URL('/login', request.url));
        response.cookies.delete('session');
        return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  // Do not run middleware on static files or API routes
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
