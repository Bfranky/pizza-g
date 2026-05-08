import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/app/components/layout/navbar';
import Footer from '@/app/components/layout/footer'
import WhatsAppButton from '@/app/components/Whatsappbutton';
import ToastProvider from '@/app/components/Toastprovider';

export const metadata: Metadata = {
  title: {
    default: 'Pizza Garden — Best Pizza in Obosi, Anambra Nigeria',
    template: '%s | Pizza Garden Obosi',
  },
  description:
    'Pizza Garden is a premier pizza restaurant and bar located at 1 Iruka Street, Obosi, Anambra State, Nigeria. Order fresh pizzas, drinks, and bar items online for dine-in, takeaway, or delivery.',
  keywords: [
    'pizza Obosi',
    'pizza Anambra Nigeria',
    'pizza restaurant Obosi',
    'best pizza Nigeria',
    'Pizza Garden Obosi',
    'pizza bar Anambra',
    'online pizza order Nigeria',
    'restaurant Obosi',
    'food delivery Obosi',
  ],
  authors: [{ name: 'Pizza Garden' }],
  creator: 'Pizza Garden',
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: 'https://pizzagarden.ng',
    siteName: 'Pizza Garden',
    title: 'Pizza Garden — Best Pizza in Obosi, Anambra Nigeria',
    description:
      'Fresh pizzas, drinks, and bar items. Dine-in, takeaway, or delivery. Open daily until 8PM at 1 Iruka Street, Obosi, Anambra.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Pizza Garden Restaurant — Obosi Anambra',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pizza Garden — Best Pizza in Obosi, Anambra',
    description: 'Fresh pizza, bar & more at 1 Iruka Street, Obosi. Order online!',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  metadataBase: new URL('https://pizzagarden.ng'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Lato:wght@300;400;700&family=Dancing+Script:wght@700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-cream">
        <ToastProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
        </ToastProvider>
      </body>
    </html>
  );
}