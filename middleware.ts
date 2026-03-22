import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const url = request.nextUrl.clone();
  
  // Check if the request is not using www subdomain
  // and it's on production (not localhost)
  if (
    !host.startsWith('www.') && 
    !host.includes('localhost') && 
    !host.includes('127.0.0.1') &&
    !host.includes('vercel.app') // Don't redirect Vercel preview URLs
  ) {
    // Redirect to www version with 301 permanent redirect
    url.host = `www.${host}`;
    return NextResponse.redirect(url, 301);
  }
  
  // Also handle trailing slashes for consistency
  if (url.pathname !== '/' && url.pathname.endsWith('/')) {
    url.pathname = url.pathname.slice(0, -1);
    return NextResponse.redirect(url, 301);
  }
  
  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|robots.txt|sitemap.xml).*)',
  ],
};