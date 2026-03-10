import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./lib/auth";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  const isProtectedRoute = request.nextUrl.pathname.startsWith('/painel')

  if(isProtectedRoute) {
    if(!token) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    const payload = await verifyToken(token);

    if(!payload) {
      const response = NextResponse.redirect(new URL('/', request.url));
      response.cookies.delete('token');
      return response;
    }
  }

  if(token && request.nextUrl.pathname === '/') {
    const payload = await verifyToken(token);
    if(payload) {
      return NextResponse.redirect(new URL('/painel', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/painel/:path*', '/'],
};