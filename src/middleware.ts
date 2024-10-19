import { convexAuthNextjsMiddleware, createRouteMatcher, isAuthenticatedNextjs, nextjsMiddlewareRedirect } from "@convex-dev/auth/nextjs/server";

const isPublicPaage = createRouteMatcher(['/auth'])

export default convexAuthNextjsMiddleware((request) => {
    console.log("request : we are outside this ")
    if (!isPublicPaage(request) && !isAuthenticatedNextjs()) {
        console.log("we are inside the if condition")
        return nextjsMiddlewareRedirect(request, '/auth')
    }

    if(isPublicPaage(request) && isAuthenticatedNextjs()){
        return nextjsMiddlewareRedirect(request, '/')
    }
});

export const config = {
    // The following matcher runs middleware on all routes
    // except static assets.
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};