import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (key) => req.cookies.get(key)?.value,
        set: (key, value, options) => {
          res.cookies.set({ name: key, value, ...options });
        },
        remove: (key, options) => {
          res.cookies.set({ name: key, value: "", ...options });
        },
      },
    }
  );

  const { data } = await supabase.auth.getSession();
  const isAuthed = !!data.session;
  const url = req.nextUrl;

  const memberArea = url.pathname.startsWith("/member");
  const adminArea = url.pathname.startsWith("/admin");

  if ((memberArea || adminArea) && !isAuthed) {
    const signIn = new URL("/ (auth)/signin".replace(" ", ""), req.url); // normalize
    signIn.searchParams.set("next", url.pathname);
    return NextResponse.redirect(signIn);
  }

  return res;
}

export const config = {
  matcher: ["/member/:path*", "/admin/:path*"],
};


