import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components";
import { Toaster } from "react-hot-toast";
import AuthProvider from "@/context/Auth";

export const metadata: Metadata = {
  title: "Arada dictionary",
  description: "A crowdsourced dictionary that focuses on slang and informal language",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div>
          <AuthProvider>
            <Toaster />
            <Navbar />
            {children}
            <Footer />
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
