import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from 'next/server'
const isPublicRoute = createRouteMatcher(
  [
    '/',
    '/sign-in',
    '/sign-up',
    '/api/clerk-webhook',
    '/api/drive-activity/notification',
    '/api/payment/success',
  ]
)
const isProtectedRoute = createRouteMatcher([
    '/api/auth/callback/discord',
    '/dashboard',
    '/connections',
    '/settings',
    '/workflows',
    '/api/auth/callback/notion',
    '/api/auth/callback/slack',
    '/api/flow',
    '/api/cron/wait',
])
export default clerkMiddleware((auth, req) => {
  if(!isPublicRoute(req)) {
    auth().protect();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};