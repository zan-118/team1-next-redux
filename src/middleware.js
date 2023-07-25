import { NextResponse } from "next/server";

export function middleware(req) {
  console.log(req.nextUrl.pathname);
}
