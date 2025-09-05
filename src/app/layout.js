"use client";

import { SessionProvider } from "next-auth/react";
import Header from "../components/header";
import "./globals.css";
import Footer from "@/components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Header></Header>
          {children}
          <Footer></Footer>
        </SessionProvider>
      </body>
    </html>
  );
}
