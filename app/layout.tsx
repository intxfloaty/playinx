import React from "react"
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{
        backgroundColor:"#ffffff"
        // backgroundColor:"#161616"
        }}>
        <Theme>
          {children}
        </Theme>
      </body>
    </html>
  )
}