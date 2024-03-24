import { NextResponse } from 'next/server'

export async function middleware(request) {

    console.log("middleware executed")
    const token = request.cookies.get('AuthToken')?.value
    const pathname = request.nextUrl.pathname


    
    
    

    return null;
}

export const config = {
    matcher: ["/", "/offline", "/home" ]
};
