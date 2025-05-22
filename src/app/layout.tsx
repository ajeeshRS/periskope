import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import RightSidebar from "@/components/right-sidebar";

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-inter",
});

const geist = Geist({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: "Periskope",
  description: "Take home assignment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${geist.variable} antialiased`}
        suppressHydrationWarning
      >
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
          </div>
          <RightSidebar />
        </div>
      </body>
    </html>
  );
}
