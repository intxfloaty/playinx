import React from "react";
import { Providers } from "./providers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import AuthProvider from "../components/AuthProvider";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const accessToken = session?.access_token || null;
  return (
    <html lang="en">
      <body
        style={{
          // backgroundColor: "#ffffff"
          backgroundColor: "#161616",
        }}
      >
        <AuthProvider accessToken={accessToken}>
          <Providers>{children}</Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
