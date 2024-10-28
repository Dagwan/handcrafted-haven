// src/app/layout.tsx

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import localFont from "next/font/local";
import "./globals.css";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CartProvider } from '../context/CartContext'; 
import { SearchProvider } from '../context/SearchContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
  pageTitle = "Handcrafted Haven", 
}: Readonly<{
  children: React.ReactNode;
  pageTitle?: string; 
}>) {
  return (
    <html lang="en">
      <head>
        <title>{`${pageTitle} | Handcrafted Haven`}</title>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" type="image/icon" />
        {/* If you're using a PNG favicon, use the following instead */}
         <link rel="icon" href="/favicon.png" type="image/png" /> 
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <SearchProvider>
          <CartProvider>
            <Header />
            <main>
              {children}
            </main>
            <Footer />
          </CartProvider>
        </SearchProvider>
      </body>
    </html>
  );
}
