import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import type { Database } from "../../../database.types";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = createRouteHandlerClient<Database>(
      { cookies },
      { supabaseUrl, supabaseKey }
    );
    await supabase.auth.exchangeCodeForSession(code);
  }

  // Determine the redirect URL based on the environment
  const redirectURL =
    process.env.NODE_ENV === "production"
      ? "https://playinx.vercel.app" // Replace with your production URL
      : "http://localhost:3000"; // Use localhost for development

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(redirectURL + "/profile");
}
