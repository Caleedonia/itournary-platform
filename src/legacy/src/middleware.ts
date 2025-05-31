// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Define protected routes that require authentication
  // /account itself is the sign-in page, so it shouldn't be protected by this logic if unauthenticated
  // users need to see a login form there.
  const protectedRoutes = [
    "/account/edit-profile",
    "/account/itineraries", // Add other specific account sub-pages here
    // Add other routes like "/checkout" or "/my-bookings" if they exist and need protection
  ];

  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/account", req.url); // Redirect to your sign-in page
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.href);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (public images folder if you have one at root)
     * - assets (public assets folder if you have one at root)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|images|assets).*)",
  ],
};
