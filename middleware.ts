import authConfig from "./auth.config"
import NextAuth from "next-auth"
import {publicRoutes, apiAuthRoute, authRoutes, DEFAULT_REDIRECT_ROUTE, UNAUTHORIZED_REDIRECT_ROUTE} from "@/routes"
import { NextResponse } from "next/server"
export const {auth: middleware} = NextAuth(authConfig)

export default middleware((req) => {
    const {nextUrl} = req
    const isLoggedIn = Boolean(req.auth)
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
    const isAuthRoute =  authRoutes.includes(nextUrl.pathname)
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthRoute)

    if(isApiAuthRoute) return NextResponse.next()
    if(isAuthRoute){
        /** 
         * Authenticated users are not permitted to visit auth routes
        */
        if(isLoggedIn){
            return  Response.redirect(new URL(DEFAULT_REDIRECT_ROUTE, nextUrl))
        }
        return NextResponse.next()
    }
    if(!isLoggedIn && !isPublicRoute){
        /**
         * UnAuthenticated users should not be able to visit protected routes
         */
        return Response.redirect(new URL(UNAUTHORIZED_REDIRECT_ROUTE, nextUrl))
    }
    return NextResponse.next()
})

// Optionally, don't invoke Middleware on some paths
// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}