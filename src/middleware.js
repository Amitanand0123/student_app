import { NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  // Example: Log every API request
  if (request.nextUrl.pathname.startsWith('/api/')) {
    console.log(`API Request: ${request.method} ${request.url}`);
  }

  // Example: Add a custom header to the request
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-request-time', Date.now().toString());

  // In a real app, you would perform authentication checks here.
  // For example, check for a valid session token in cookies.
  // const session = request.cookies.get('session')?.value;
  // if (!session && request.nextUrl.pathname.startsWith('/api/')) {
  //   // Respond with an unauthorized error if the session is missing
  //   return new NextResponse(
  //     JSON.stringify({ success: false, message: 'authentication failed' }),
  //     { status: 401, headers: { 'content-type': 'application/json' } }
  //   );
  // }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/api/:path*',
};