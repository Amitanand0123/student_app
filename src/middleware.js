import { NextResponse } from 'next/server';

export function middleware(request) {
  if (request.nextUrl.pathname.startsWith('/api/')) {
    console.log(`API Request: ${request.method} ${request.url}`);
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-request-time', Date.now().toString());

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: '/api/:path*',
};