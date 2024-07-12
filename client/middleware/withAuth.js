import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";

export default function withAuth(middleware) {
  return async (req, next) => {
    const token = req.cookies.get("token");
    const decoded = jwtDecode(token?.value);
    // console.log("🚀 ~ return ~ decoded:", decoded);
    const pathname = req.nextUrl.pathname;

    const isAdminPage = pathname.includes("/admin");

    if (!token) {
      const url = new URL("/login", req.url);
      url.searchParams.set("callbackUrl", encodeURI(req.url));
      return NextResponse.redirect(url);
    }

    if (decoded.role !== "ADMIN" && isAdminPage) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return middleware(req, next);
  };
}
