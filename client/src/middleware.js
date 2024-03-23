import { NextResponse } from 'next/server'

export async function middleware(request) {

    console.log("middleware executed")

   
    
    // return NextResponse.redirect(new URL('/home', request.url));
    

    return null;
}

export const config = {
    matcher: ["/", "/offline" , "/home"]
};
