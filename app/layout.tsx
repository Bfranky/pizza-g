// app/layout.tsx
import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import AuthProvider from "@/components/layout/AuthProvider";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Pizza Garden | Best Pizza in Obosi, Anambra Nigeria",
    template: "%s | Pizza Garden",
  },
  description:
    "Pizza Garden — Obosi's favorite pizza restaurant and bar. Dine-in, takeaway, and delivery. Located at 1 Iruka Street, Obosi, Anambra, Nigeria. Order online today!",
  keywords: [
    "pizza Obosi",
    "pizza Anambra Nigeria",
    "Pizza Garden Obosi",
    "restaurant Obosi",
    "bar Obosi",
    "pizza delivery Anambra",
    "best pizza Nigeria",
    "Iruka Street Obosi",
  ],
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://pizzagarden.ng",
    siteName: "Pizza Garden",
    title: "Pizza Garden | Best Pizza in Obosi, Anambra Nigeria",
    description: "Obosi's favorite pizza restaurant and bar. Dine-in, takeaway, and delivery.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Pizza Garden" }],
  },
  twitter: { card: "summary_large_image", title: "Pizza Garden Obosi", description: "Obosi's favorite pizza restaurant and bar." },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${lato.variable}`}>
      <body className="bg-brand-cream font-body text-brand-charcoal antialiased">
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <WhatsAppButton />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: { background: "#2C2C2C", color: "#FFF8F0", fontFamily: "var(--font-lato)" },
              success: { iconTheme: { primary: "#C0392B", secondary: "#FFF8F0" } },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
