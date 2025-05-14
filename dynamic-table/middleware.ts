// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {store} from "@/store/store";

export function middleware(request: NextRequest) {
    // Check for the presence of the 'access_token' cookie
    const token = request.cookies.get('access_token')?.value;
    if (token && !store.userStore.isLoggedIn) {
        store.userStore.persistence();
    }

    // If no token and the path is protected, redirect to login
    const protectedPaths = ['/task-management/dashboard'];

    const isProtectedRoute = protectedPaths.some(path =>
        request.nextUrl.pathname.startsWith(path)
    );

    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/task-management'], // Protect these routes
};
