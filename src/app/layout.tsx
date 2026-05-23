import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google"; // 1. Import Syne and DM Sans
import "./globals.css";

// 2. Configure Syne for bold, powerful headers
const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

// 3. Configure DM Sans for clean, modern body text
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Benutra — Digital Transport Intelligence",
  description: "Powering the future of transport in Benue State.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // 4. Apply the variables to the HTML tag
      className={`${syne.variable} ${dmSans.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
