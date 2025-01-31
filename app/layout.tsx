import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

import { cn } from "@/utils";
import { Poppins } from "next/font/google";

export const metadata: Metadata = {
  title: "VOICE AI",
  description: "VOICE AI real time conversation",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // Choose weights as needed
  variable: "--font-poppins", // Use CSS variable
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body
        className={cn(GeistSans.variable, GeistMono.variable, " font-poppins")}
      >
        {children}
      </body>
    </html>
  );
}
