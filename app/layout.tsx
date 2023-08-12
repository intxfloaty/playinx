import React from "react"
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{
        // backgroundColor: "#ffffff"
        backgroundColor:"#161616"
      }}>
        <Theme>
          <Providers>
            {children}
          </Providers>
        </Theme>
      </body>
    </html>
  )
}