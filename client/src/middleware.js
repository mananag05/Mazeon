import { NextResponse } from 'next/server'

export async function middleware(request) {

    return null;
}

export const config = {
    matcher: ["/", "/offline", "/home" ]
};
