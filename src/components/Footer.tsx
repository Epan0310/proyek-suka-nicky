import Link from "next/link";
import {
  MapPin,
  Phone,
  Clock,
  ShieldCheck,
  Lock,
  ExternalLink,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-400 border-t border-stone-800/80 pt-12 pb-8 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        {/* Kolom 1: Brand & Identity */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center font-black text-xs shadow-md">
              SN
            </div>
            <span className="font-black text-stone-100 text-base tracking-tight">
              Suka Nicky
            </span>
          </div>
          <p className="text-stone-400 leading-relaxed text-[11px]">
            Pelopor Keripik Tempe Mocaf & Oleh-Oleh Khas Banjarnegara sejak
            1996. Diproduksi higienis dengan bahan lokal pilihan.
          </p>
          <div className="flex items-center gap-1.5 text-amber-500 font-semibold text-[11px]">
            <ShieldCheck className="w-4 h-4" />
            <span>100% Halal & Tanpa Pengawet</span>
          </div>
        </div>

        {/* Kolom 2: Navigasi Cepat */}
        <div className="space-y-3">
          <h4 className="font-bold text-stone-200 text-xs tracking-wider uppercase">
            Navigasi
          </h4>
          <ul className="space-y-2 text-[12px]">
            <li>
              <Link href="/" className="hover:text-amber-400 transition">
                Beranda
              </Link>
            </li>
            <li>
              <Link href="#katalog" className="hover:text-amber-400 transition">
                Katalog Produk
              </Link>
            </li>
            <li>
              <Link href="#tentang" className="hover:text-amber-400 transition">
                Tentang Kami
              </Link>
            </li>
            <li>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-400 transition inline-flex items-center gap-1"
              >
                <span>Pesan via WA</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </li>
          </ul>
        </div>

        {/* Kolom 3: Kategori Produk */}
        <div className="space-y-3">
          <h4 className="font-bold text-stone-200 text-xs tracking-wider uppercase">
            Kategori
          </h4>
          <ul className="space-y-2 text-[12px]">
            <li className="hover:text-amber-400 transition cursor-pointer">
              Keripik Tempe Mocaf
            </li>
            <li className="hover:text-amber-400 transition cursor-pointer">
              Olahan Ikan (Abon Patin/Gurame)
            </li>
            <li className="hover:text-amber-400 transition cursor-pointer">
              Manisan Carica Dieng
            </li>
            <li className="hover:text-amber-400 transition cursor-pointer">
              Kuliner Lokal Gubug
            </li>
          </ul>
        </div>

        {/* Kolom 4: Lokasi & Kontak */}
        <div className="space-y-3">
          <h4 className="font-bold text-stone-200 text-xs tracking-wider uppercase">
            Lokasi & Kontak
          </h4>
          <ul className="space-y-2.5 text-[11px] text-stone-400">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>
                Desa Gumiwang, Kec. Purwanegara, Kab. Banjarnegara, Jawa Tengah
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-500 shrink-0" />
              <span>+62 812-XXXX-XXXX (WhatsApp Admin)</span>
            </li>
            <li className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Buka Setiap Hari: 08.00 - 17.00 WIB</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar & Link Admin */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 border-t border-stone-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-500">
        <p>© 2026 UMKM Suka Nicky Banjarnegara. All Rights Reserved.</p>

        <div className="flex items-center gap-3">
          <span className="text-stone-700 hidden sm:inline">|</span>
          <Link
            href="/admin"
            className="hover:text-amber-400 transition flex items-center gap-1 text-stone-600 hover:text-stone-300"
            title="Akses Dashboard Admin"
          >
            <Lock className="w-3 h-3" />
            <span>Admin Portal</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
