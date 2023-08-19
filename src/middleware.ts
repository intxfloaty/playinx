import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import type { Database } from "./database.types";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
  const supabase = createMiddlewareClient<Database>(
    { req, res },
    // { supabaseUrl, supabaseKey }
  );
  await supabase.auth.getSession();
  return res;
}

export const config = {
  matcher: ['/', '/profile'],
};
