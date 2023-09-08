import React from "react";
import { Providers } from "./providers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import AuthProvider from "../components/AuthProvider";
import { createServerSupabaseClient } from "../serverSupabaseClient";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerSupabaseClient()

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const accessToken = session?.access_token || null;
  return (
    <html lang="en">
      <body
        style={{
          // backgroundColor: "#ffffff"
          backgroundColor: "black",
        }}
      >
        <AuthProvider accessToken={accessToken}>
          <Providers>{children}</Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
