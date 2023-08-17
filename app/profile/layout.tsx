import React from "react"
import { Box } from "../chakraExports"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main style={{ paddingInline: "5%", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center" }}>
       <Box  w={{
        base: "100%", // 0-48em
        md: "50%", // 48em-80em,
        xl: "25%", // 80em+
      }}>
        <img
          style={{ maxWidth: "100%", objectFit: "contain" }}
          alt="Logo"
          src="/images/logo5.svg" />
      </Box>
      {children}
    </main>
  )
}