import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Navbar from "../components/ui/navbar"; // Import Navbar component
import Footer from "../components/ui/footer"; // Import Footer component
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "PreTest",
  description: "Get Test ready!, with PreTest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans antialiased">
        <AuthProvider>
          <div className="flex flex-col min-h-screen max-w-full">
            <Navbar /> {/* Navbar appears at the top */}
            <main className="flex-1 ">{children}</main>{" "}
            {/* Main page content */}
            <Footer /> {/* Footer appears at the bottom */}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
