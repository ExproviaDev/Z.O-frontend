import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("access_token")?.value;
  const { pathname } = request.nextUrl;
  const protectedRoutes = ["/dashboard", "/leaderboard", "/quiz"];
  const isProtectedRoute = protectedRoutes.some((route) => 
    pathname.startsWith(route)
  );
  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    "/dashboard/:path*", 
    "/leaderboard/:path*", 
    "/quiz/:path*"
  ],
};