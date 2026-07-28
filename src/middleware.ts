import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// JWT token decode helper — returns payload if valid, null otherwise
function decodeToken(token: string, ignoreExpiration = false): { exp?: number; role?: string; username?: string } | null {
  if (!token) return null;

  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const payload = JSON.parse(atob(parts[1]));
    const currentTime = Math.floor(Date.now() / 1000);

    if (!ignoreExpiration && payload.exp && payload.exp < currentTime) {
      return null;
    }

    return payload;
  } catch (error) {
    console.error('Token validation error:', error);
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protected pages that require authentication
  const protectedPages = [
    '/dashboard',
    '/profile',
    '/my-bookings',
    '/admin-dashboard',
    '/list-your-boat',
    '/payment'
  ];

  // Pages that require admin role
  const adminPages = ['/admin-dashboard', '/list-your-boat'];

  // Pages that should be accessible without auth when loaded via payment gateway redirect
  const iframeAllowedPages = ['/payment/success', '/payment/fail'];
  const isIframeAllowed = iframeAllowedPages.some(page => pathname.startsWith(page));

  // Check if current page is protected (excluding payment result pages)
  const isProtectedPage = !isIframeAllowed && protectedPages.some(page => pathname.startsWith(page));
  const isAdminPage = adminPages.some(page => pathname.startsWith(page));

  // Get token from cookies
  const token = request.cookies.get('access_token')?.value;
  // For protected pages, we ignore expiration to let the client-side API requests refresh the token.
  // For other pages (like login/signup), we check expiration strictly to avoid redirecting users with expired tokens away from login.
  const payload = token ? decodeToken(token, isProtectedPage) : null;

  // If trying to access a protected page without valid token, redirect to login
  if (isProtectedPage) {
    if (!payload) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // If trying to access admin page without admin role, redirect to home
    if (isAdminPage && payload.role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // If user is authenticated and trying to access login/signup, redirect to home
  if (payload && (pathname === '/login' || pathname === '/signup')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};