import type { Metadata } from "next";
import "./globals.css";
import {Outfit} from 'next/font/google'
import { ClerkProvider } from "@clerk/nextjs";
import Provider  from "./provider.js"

export const metadata: Metadata = {
  title: "Inspiro",
  description: "Generated by create next app",
};
const outfit = Outfit({subsets: ['latin']})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={outfit.className}
      >
        <Provider>
          {children}
        </Provider>
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
