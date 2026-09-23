import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/context/CartContext";
import { ProductProvider } from "@/context/ProductContext"; // <-- Import ini

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Suka Nicky - Oleh-Oleh & Kuliner Banjarnegara",
  description: "Katalog Resmi Oleh-Oleh Suka Nicky Banjarnegara",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <ProductProvider>
          <CartProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <CartDrawer />
          </CartProvider>
        </ProductProvider>
      </body>
    </html>
  );
}
