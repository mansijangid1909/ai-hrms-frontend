import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { STORAGE_KEYS, ROUTES, ROLE_DASHBOARD } from '@/constants';

const publicPaths = [ROUTES.HOME, ROUTES.LOGIN, ROUTES.REGISTER, ROUTES.FORGOT_PASSWORD, ROUTES.RESET_PASSWORD, ROUTES.VERIFY_EMAIL, ROUTES.OTP, ROUTES.FEATURES, ROUTES.SOLUTIONS, ROUTES.TECHNOLOGY, ROUTES.PRICING, ROUTES.DOCS, ROUTES.ABOUT, ROUTES.CONTACT];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(STORAGE_KEYS.ACCESS_TOKEN)?.value;

  // Allow public paths and admin routes (no auth yet)
  if (publicPaths.some((p) => pathname === p) || pathname.startsWith('/admin') || pathname.startsWith('/_next') || pathname.includes('.')) {
    return NextResponse.next();
  }

  // Protect dashboard routes
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/recruitment') || pathname.startsWith('/employees') || pathname.startsWith('/payroll') || pathname.startsWith('/attendance') || pathname.startsWith('/performance') || pathname.startsWith('/learning') || pathname.startsWith('/analytics') || pathname.startsWith('/chatbot') || pathname.startsWith('/settings')) {
    if (!token) {
      const loginUrl = new URL(ROUTES.LOGIN, request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
