// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Change to a standard font
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "FinCalc - Financial Calculators",
  description: "Smart financial calculators to help you plan your future",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased flex flex-col min-h-screen`}
      >
        <div className="flex-grow">
          {children}
        </div>
      </body>
    </html>
  );
}