import React from "react"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main style={{ paddingInline: "5%" }}>
      <div>
        <img
          style={{ maxWidth: "100%", objectFit: "contain" }}
          alt="Logo"
          src="/images/logo5.svg" />
      </div>
      {children}
    </main>
  )
}