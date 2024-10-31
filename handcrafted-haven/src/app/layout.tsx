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
        <title>{`${pageTitle} - Handcrafted Haven`}</title>
        {/* Favicon */}
        <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/images/favicon.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/images/favicon.png" type="image/png" sizes="16x16" />
        {/* Google Font */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" 
          rel="stylesheet" 
        />
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
