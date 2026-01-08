import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../../components/AuthProvider";
import { ToastContainer } from "react-toastify";
import GoogleTag from "../../components/GoogleTag";
import HubSpot from "../../components/HubSpot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://barprime.io"),
  title: "BarPrime",
  description:
    "BarPrime is a premier online review center dedicated to equipping future lawyers with comprehensive study tools, practice exams, and expert resources to ensure success in the bar examination.",
  openGraph: {
    type: "website",
    images: "/og-img.png",
    url: `/`,
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" data-scroll-behavior="smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {process.env.GOOGLE_TAG_ID && <GoogleTag />}
        <AuthProvider>{children}</AuthProvider>
        <ToastContainer />
        <HubSpot />
      </body>
    </html>
  );
}
