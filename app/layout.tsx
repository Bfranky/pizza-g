import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import AuthProvider from "@/components/layout/AuthProvider";

export const metadata: Metadata = {
  title: {
    default: "Pizza Garden | Fine Pizza & Bar - Obosi, Anambra",
    template: "%s | Pizza Garden",
  },
  description: "Pizza Garden — Obosi's premier pizza restaurant and bar. Authentic wood-fired pizzas, craft cocktails and warm hospitality at 1 Iruka Street, Obosi, Anambra, Nigeria.",
  keywords: ["pizza Obosi","pizza Anambra Nigeria","Pizza Garden Obosi","restaurant Obosi","bar Obosi","pizza delivery Anambra","best pizza Nigeria"],
  openGraph: {
    type: "website", locale: "en_NG", url: "https://pizzagarden.ng",
    siteName: "Pizza Garden",
    title: "Pizza Garden | Fine Pizza & Bar - Obosi, Anambra",
    description: "Obosi's premier pizza restaurant and bar.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Pizza Garden" }],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <WhatsAppButton />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: { background: "#1A1614", color: "#FAF6F0", fontFamily: "'Jost', sans-serif", fontSize: "14px", border: "1px solid rgba(200,150,62,0.3)" },
              success: { iconTheme: { primary: "#C8963E", secondary: "#1A1614" } },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}