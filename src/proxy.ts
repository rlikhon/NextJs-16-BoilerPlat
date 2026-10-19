import { NextResponse, type NextRequest } from "next/server";
import { auth } from "./auth";
//import { useSession } from "next-auth/react";

const PUBLIC_ROUTES = ["/"];
const PUBLIC_APIS = ["/api/auth"];

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith(".")
  ) {
    return NextResponse.next();
  }

  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  if (PUBLIC_APIS.includes(pathname)) {
    return NextResponse.next();
  }

  const session = await auth();
  //const session = useSession();

  if (!session) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const role = session?.user?.role;

  if (pathname.startsWith("/admin")) {
    if (role != "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (pathname.startsWith("/partner")) {
    if(pathname.startsWith("/partner/onboarding")) {
      return NextResponse.next();
    }
    if (role != "partner") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (pathname.startsWith("/api")) {
    if (!session.user) {
      return Response.json(
        { message: "User is not Unauthorized" },
        { status: 401 },
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};