import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Admin login functionality has been removed.
  return NextResponse.next();
}

export const config = {
  // Do not run middleware on static files or API routes
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
