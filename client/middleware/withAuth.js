import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";

export default function withAuth(middleware) {
  return async (req, next) => {
    const token = req.cookies.get("token");
    const pathname = req.nextUrl.pathname;

    const isAdminPage = pathname.includes("/admin");
    const isStaffPage = pathname.includes("/staff");
    const isLoginPage = pathname.includes("/login");
    const isHeadPage = pathname.includes("/head");

    if (token && isLoginPage) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (token === undefined && !isLoginPage) {
      const url = new URL("/login", req.url);
      url.searchParams.set("callbackUrl", encodeURI(req.url));
      return NextResponse.redirect(url);
    }

    if (token) {
      try {
        const decoded = jwtDecode(token?.value);

        if (decoded.role !== "ADMIN" && isAdminPage) {
          return NextResponse.redirect(new URL("/", req.url));
        }
        if (decoded.role !== "STAFF" && isStaffPage) {
          console.log("test");
          return NextResponse.redirect(new URL("/", req.url));
        }
        if (decoded.role !== "KEPALA_BAGIAN" && isHeadPage) {
          return NextResponse.redirect(new URL("/", req.url));
        }
      } catch (error) {
        console.log(error);
      }
    }

    return middleware(req, next);
  };
}
