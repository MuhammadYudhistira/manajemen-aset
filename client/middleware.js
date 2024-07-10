import { NextResponse } from "next/server";

export function middleware(request) {
  let cookie = request.cookies.get("token");
  if (!cookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/admin/:path*", "/head", "/staff"],
};
