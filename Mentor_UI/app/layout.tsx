import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "../components/ui/navbar";
import Footer from "../components/ui/footer";
import Sidebar from "../components/sidebar/page"; // Import Sidebar
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex flex-col min-h-screen max-w-full">
            <Navbar />

            <main className="flex-1   ">{children}</main>

            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
