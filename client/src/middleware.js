import { NextResponse } from 'next/server'

export async function middleware(request) {
  console.log("middleware executed")

   
    // If you want to redirect somewhere, you can do it like this:
    // return NextResponse.redirect(new URL('/home', request.url));
    
    // If no redirect is desired, return null
    return null;
}

export const config = {
    matcher: ["/", "/offline"]
};
