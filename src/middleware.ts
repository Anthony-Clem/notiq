import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/session";
import { cookies } from "next/headers";

export default async function middleware(req: NextRequest) {
  const protectedRoutes = "/dashboard";
  const authRoutes = "/auth";
  const currentPath = req.nextUrl.pathname;
  const isProtectedRoute = currentPath.startsWith(protectedRoutes);
  const isAuthRoute = currentPath.startsWith(authRoutes);

  // Check if the route is protected
  if (isProtectedRoute) {
    const cookie = (await cookies()).get("session")?.value;

    if (!cookie) {
      // If there's no cookie, redirect to login
      return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
    }

    const session = await decrypt(cookie);

    if (!session?.userId) {
      // If session doesn't have a valid userId, redirect to login
      return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
    }
  }

  // Check if the route is for authentication
  if (isAuthRoute) {
    const cookie = (await cookies()).get("session")?.value;
    const session = cookie ? await decrypt(cookie) : null;

    if (session?.userId) {
      // If the user is already logged in, redirect to dashboard
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }
  }

  // Continue to the next middleware or route
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
