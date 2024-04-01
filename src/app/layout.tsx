import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components";
import { Toaster } from "react-hot-toast";


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
          <Toaster />
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
