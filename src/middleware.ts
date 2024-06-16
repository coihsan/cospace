import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

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
export default clerkMiddleware((auth, req) => {
  if(!isPublicRoute(req)) {
    auth().protect();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};