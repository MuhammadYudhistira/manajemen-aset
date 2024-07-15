import { NextResponse } from "next/server";
import withAuth from "./middleware/withAuth";

export async function mainMiddleware(request) {
  const res = NextResponse.next();
  return res;
}

export const config = {
  matcher: ["/", "/admin/:path*", "/head", "/staff", "/login"],
};

export default withAuth(mainMiddleware);
