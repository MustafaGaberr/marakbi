import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// JWT token validation helper
function isTokenValid(token: string): boolean {
  if (!token) return false;
  
  try {
    // Decode JWT token (basic validation)
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    
    const payload = JSON.parse(atob(parts[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    
    // Check if token is expired
    if (payload.exp && payload.exp < currentTime) {
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Token validation error:', error);
    return false;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get token from cookies
  const token = request.cookies.get('access_token')?.value;
  
  // Protected pages that require authentication
  const protectedPages = [
    '/dashboard',
    '/profile',
    '/my-bookings',
    '/admin-dashboard',
    '/list-your-boat',
    '/payment'
  ];
  
  // Check if current page is protected
  const isProtectedPage = protectedPages.some(page => pathname.startsWith(page));
  
  // If trying to access a protected page without valid token, redirect to login
  if (isProtectedPage) {
    if (!token || !isTokenValid(token)) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  // If user is authenticated and trying to access login/signup, redirect to home
  if (token && isTokenValid(token) && (pathname === '/login' || pathname === '/signup')) {
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