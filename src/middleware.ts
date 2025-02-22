import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    console.log("Middleware chamado para:", req.nextUrl.pathname); 
  const token = req.cookies.get("token")?.value;
  console.log(token);
  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/changePassword",
    "/contracts/:path*",
    "/dataUsers/:path*",
    "/financial/:path*"
  ], 
};

