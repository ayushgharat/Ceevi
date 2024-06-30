import { NextResponse, type NextRequest } from "next/server"

import { checkIfUserIsLoggedIn } from "~app/action"
import { updateSession } from "~utils/supabase/middleware"

export async function middleware(request: NextRequest) {
  // const { user, error } = await checkIfUserIsLoggedIn()
  
  // const path = request.nextUrl.pathname
  // console.log(user)
  // if (!user) {
  //   console.log("redirecting to login")
  //   NextResponse.redirect(new URL("/authenticate/login", request.url))
  // }

  // return NextResponse.next()
  return await updateSession(request)
}

export const config = {
  matcher: [
    "/",
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"
  ]
}
