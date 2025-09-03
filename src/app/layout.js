"use client"

import { SessionProvider } from "next-auth/react"
import Header from "../components/header"
import "./globals.css"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Header>
          </Header>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
