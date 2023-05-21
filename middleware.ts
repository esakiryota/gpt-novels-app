import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getIronSession } from "iron-session/edge";
import { ironOptions } from "./lib/ironSession/config"
import { useRouter } from 'next/router';
import { parse, format } from 'url';

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  // const res = NextResponse.next();
  // const session = await getIronSession(req, res, ironOptions);
  // // return NextResponse.redirect(new URL('/novels/', request.url))
  // const { user } = session;
  // // demo:
  // if (!user) {
  //   return NextResponse.redirect(new URL('/signin/', req.url))
  // }
  
  // return res
}

// See "Matching Paths" below to learn more
export const config = {
  // matcher: ['/', '/novels/'],
}