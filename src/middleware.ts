import { type NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // This middleware is disabled and now simply passes all requests through.
  return NextResponse.next();
}

export const config = {
  // The matcher is set to a path that should never be matched,
  // effectively disabling the middleware from running on any route.
  matcher: ['/no-paths-should-match-this'],
};
