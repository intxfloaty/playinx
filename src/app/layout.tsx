import React from "react";
import { Providers } from "./providers";
import AuthProvider from "../components/AuthProvider";
import { createServerSupabaseClient } from "../serverSupabaseClient";
import Drawer from "../components/Drawer";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerSupabaseClient()

  

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const {
    data: { user },
  } = await supabase.auth.getUser();


  const accessToken = session?.access_token || null;

  // Conditionally render the Drawer component only if the user is authenticated
  // const isAuthenticated = user !== null;
  // const drawerComponent = isAuthenticated ? (
  //   <Drawer user={user}>{children}</Drawer>
  // ) : (
  //   children
  // );


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
