"use client";

import Link from "next/link";
import { ShoppingCart, Award } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { totalItems, setIsCartOpen } = useCart();

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-amber-950 text-amber-100 text-[11px] py-2 px-4 text-center font-medium flex items-center justify-center gap-2">
        <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        <span>
          Pelopor Keripik Tempe Mocaf & Oleh-Oleh Khas Banjarnegara Sejak 1996
        </span>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-amber-800 text-white flex items-center justify-center font-black text-xl shadow-md group-hover:bg-amber-900 transition">
              SN
            </div>
            <div>
              <h1 className="text-base font-bold text-stone-900 leading-tight">
                Suka Nicky
              </h1>
              <p className="text-[10px] font-semibold text-amber-800 tracking-wide uppercase">
                Oleh-Oleh Banjarnegara
              </p>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-stone-600">
            <Link href="/" className="hover:text-amber-800 transition">
              Beranda
            </Link>
            <Link href="/katalog" className="hover:text-amber-800 transition">
              Katalog Produk
            </Link>
            <Link href="/tentang" className="hover:text-amber-800 transition">
              Tentang Kami
            </Link>
          </nav>

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 bg-emerald-800 text-white px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-emerald-900 transition shadow-sm active:scale-95"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">Keranjang</span>
            {totalItems > 0 && (
              <span className="bg-amber-400 text-stone-900 font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center ml-0.5">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </header>
    </>
  );
}
