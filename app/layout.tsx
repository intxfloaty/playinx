import React from "react";
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          // backgroundColor: "#ffffff"
          backgroundColor: "#161616",
        }}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
