/**
 * Public routes that can be accessed by anyone without authentication
  @type {string[]}
 */

export const publicRoutes = [
  "/",
  "/about",
  "/rules",
  "/verification"
]

/**
 * Authentication pages for logging in
  @type {string}
*/

export const authRoutes = ["/signin", "/api/register"]


/**
 * Authentication routes through api calls
  @type {string}
 */
export const apiAuthRoute = "/api/auth"

/**
 * redirects to the home page
 */

export const DEFAULT_REDIRECT_ROUTE = "/"

/**
 * redirects to the signin page
 */
export const UNAUTHORIZED_REDIRECT_ROUTE = "/signin"