import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/ui/navbar"; // Import Navbar component
import Footer from "../components/ui/footer"; // Import Footer component
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://pretest.fun"),
  title: {
    default: "PreTest - Master Your Next Interview",
    template: "%s | PreTest",
  },
  description: "Practice with recent grads from top companies. Get personalized mock interviews and feedback to ace your next interview.",
  keywords: [
    "mock interview",
    "interview preparation",
    "interview practice",
    "career coaching",
    "mentorship",
    "tech interviews",
    "placement preparation",
    "FAANG interview",
  ],
  authors: [{ name: "PreTest" }],
  creator: "PreTest",
  publisher: "PreTest",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pretest.fun",
    siteName: "PreTest",
    title: "PreTest - Master Your Next Interview",
    description: "Practice with recent grads from top companies. Get personalized mock interviews and feedback to ace your next interview.",
    images: [
      {
        url: "https://pretest.fun/og/og-image.png",
        width: 1200,
        height: 630,
        alt: "PreTest - Master your next interview with practice sessions from top company grads",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PreTest - Master Your Next Interview",
    description: "Practice with recent grads from top companies. Get personalized mock interviews and feedback.",
    images: ["https://pretest.fun/og/twitter-card.png"],
    creator: "@pretestfun",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#f97316",
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
            <main className="flex-1 pt-14">{children}</main>{" "}
            {/* Main page content */}
            <Footer /> {/* Footer appears at the bottom */}
          </div>
          <ToastContainer
            position="top-right"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </AuthProvider>
      </body>
    </html>
  );
}
