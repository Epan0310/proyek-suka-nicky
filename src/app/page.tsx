"use client";

import { useState, useEffect } from "react";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/context/ProductContext";
import {
  Search,
  Plus,
  MapPin,
  Phone,
  Truck,
  ShieldCheck,
  X,
  Star,
  Award,
  Sparkles,
  ArrowRight,
  Heart,
  PackageSearch,
  RotateCcw,
} from "lucide-react";

export default function Home() {
  const { addToCart, setIsCartOpen } = useCart();
  const { products } = useProducts(); // <-- Membaca data produk langsung dari ProductContext
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  const categories = [
    "Semua",
    "Keripik",
    "Olahan Ikan",
    "Dodol & Buah",
    "Kuliner Lokal",
  ];

  // Helper pemformatan mata uang Rupiah
  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Efek aksesibilitas modal (Tombol ESC & Lock Scroll)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveProduct(null);
    };

    if (activeProduct) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [activeProduct]);

  // Filtering produk berdasarkan state 'products' dinamis
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "Semua" || product.category === selectedCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleResetFilter = () => {
    setSelectedCategory("Semua");
    setSearchQuery("");
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-stone-800 antialiased selection:bg-amber-200">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-16 md:pt-16 md:pb-24 border-b border-stone-200/60 bg-gradient-to-b from-amber-50/80 via-[#FAF8F5] to-[#FAF8F5]">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7 space-y-6 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-amber-100 border border-amber-300/60 text-amber-900 text-xs px-4 py-1.5 rounded-full font-semibold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Oleh-Oleh Khas Banjarnegara Sejak 1996</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-stone-900 tracking-tight leading-[1.15]">
              Cita Rasa Otentik <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900">
                Mocaf & Culinary
              </span>
            </h1>

            <p className="text-stone-600 text-sm md:text-base leading-relaxed max-w-xl mx-auto md:mx-0 font-normal">
              Nikmati renyahnya keripik tempe tepung mocaf pilihan dan lezatnya
              abon ikan berkualitas tanpa bahan pengawet. Diproduksi higienis
              langsung dari Desa Gumiwang.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-center md:justify-start">
              <a
                href="#katalog"
                className="inline-flex items-center justify-center gap-2 bg-amber-800 hover:bg-amber-900 text-white px-7 py-3.5 rounded-xl text-xs font-bold transition shadow-lg shadow-amber-900/20 active:scale-95"
              >
                <span>Pesan Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#tentang"
                className="inline-flex items-center justify-center bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 px-6 py-3.5 rounded-xl text-xs font-bold transition shadow-sm"
              >
                Cerita Usaha
              </a>
            </div>

            {/* Micro Social Proof */}
            <div className="pt-4 flex items-center justify-center md:justify-start gap-6 border-t border-stone-200/80">
              <div>
                <p className="text-lg font-black text-stone-900">28+ Tahun</p>
                <p className="text-[11px] text-stone-500 font-medium">
                  Resep Legendaris
                </p>
              </div>
              <div className="h-8 w-px bg-stone-300"></div>
              <div>
                <p className="text-lg font-black text-stone-900">100% Halal</p>
                <p className="text-[11px] text-stone-500 font-medium">
                  Bahan Alami Lokal
                </p>
              </div>
              <div className="h-8 w-px bg-stone-300"></div>
              <div>
                <p className="text-lg font-black text-amber-800">★ 4.9/5.0</p>
                <p className="text-[11px] text-stone-500 font-medium">
                  Ribuan Pelanggan
                </p>
              </div>
            </div>
          </div>

          {/* Hero Banner / Highlight Box */}
          <div className="md:col-span-5 relative">
            <div className="absolute -inset-2 bg-amber-200/50 rounded-3xl blur-xl -z-10"></div>
            <div className="bg-white border border-stone-200/80 rounded-3xl p-6 shadow-xl space-y-5">
              <div className="relative h-56 rounded-2xl overflow-hidden bg-stone-100">
                <img
                  src="https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80"
                  alt="Keripik Tempe Suka Nicky"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 right-3 bg-emerald-800 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow">
                  Best Seller #1
                </span>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-stone-900 text-base">
                    Keripik Tempe Mocaf Premium
                  </h3>
                  <span className="text-xs font-black text-amber-900 bg-amber-100 px-2.5 py-1 rounded-lg">
                    {formatRupiah(18000)}
                  </span>
                </div>
                <p className="text-xs text-stone-500 mt-1">
                  Dibuat dari tepung singkong mocaf pilihan. Tekstur jauh lebih
                  renyah, gurih, dan aman untuk pencernaan.
                </p>
              </div>

              <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-200/50 text-[11px] text-amber-900 flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Pemenang Penghargaan Pangan Nusa Kategori Camilan</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST BADGES */}
      <section className="bg-white border-b border-stone-200/60 py-8">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-stone-900">Bahan Alami</h4>
              <p className="text-[11px] text-stone-500">
                Tanpa bahan pengawet buatan
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-stone-900">
                Masuk Indomaret
              </h4>
              <p className="text-[11px] text-stone-500">
                Kualitas olahan terjamin
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-stone-900">
                Kirim Seluruh Indonesia
              </h4>
              <p className="text-[11px] text-stone-500">
                Packing aman bubble wrap
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-stone-900">
                Pemberdayaan Lokal
              </h4>
              <p className="text-[11px] text-stone-500">
                100% Produk UMKM Desa
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. KATALOG PRODUK */}
      <section id="katalog" className="max-w-6xl mx-auto px-4 py-16 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-stone-200 pb-6">
          <div>
            <span className="text-xs font-bold text-amber-800 uppercase tracking-widest bg-amber-100 px-3 py-1 rounded-full">
              Katalog Lengkap
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-stone-900 mt-2">
              Pilihan Oleh-Oleh Favorit
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Pilih produk khas Banjarnegara langsung dari produsennya.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Cari keripik, abon, carica..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-700 shadow-sm"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? "bg-amber-800 text-white shadow-md"
                  : "bg-white text-stone-600 hover:bg-stone-100 border border-stone-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden border border-stone-200/80 shadow-sm hover:shadow-xl transition duration-300 flex flex-col group"
              >
                <div
                  className="relative h-52 bg-stone-100 overflow-hidden cursor-pointer"
                  onClick={() => setActiveProduct(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  {product.badge && (
                    <span className="absolute top-3 left-3 bg-amber-900/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm shadow-sm">
                      {product.badge}
                    </span>
                  )}
                </div>

                <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
                  <div>
                    <div className="flex justify-between items-center text-[11px] text-stone-400 font-medium mb-1">
                      <span>{product.category}</span>
                      <span>{product.weight}</span>
                    </div>
                    <h3
                      onClick={() => setActiveProduct(product)}
                      className="font-bold text-stone-900 text-base cursor-pointer hover:text-amber-800 transition line-clamp-1"
                    >
                      {product.name}
                    </h3>
                    <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-stone-400 block font-medium">
                        Harga
                      </span>
                      <span className="text-base font-black text-amber-900">
                        {formatRupiah(product.price)}
                      </span>
                    </div>

                    <button
                      onClick={() => addToCart(product)}
                      className="bg-emerald-800 hover:bg-emerald-900 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 active:scale-95 shadow-sm"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>+ Keranjang</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-dashed border-stone-300 p-12 text-center space-y-4 max-w-md mx-auto">
            <div className="w-12 h-12 bg-amber-50 text-amber-800 rounded-full flex items-center justify-center mx-auto">
              <PackageSearch className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-sm">
                Produk Tidak Ditemukan
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Tidak ada produk yang cocok dengan kata kunci pencarian.
              </p>
            </div>
            <button
              onClick={handleResetFilter}
              className="inline-flex items-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold px-4 py-2 rounded-xl transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filter</span>
            </button>
          </div>
        )}
      </section>

      {/* 4. TENTANG USIA / MILESTONE */}
      <section
        id="tentang"
        className="bg-stone-900 text-white py-16 px-4 my-12"
      >
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
              Cerita Usaha
            </span>
            <h2 className="text-2xl md:text-4xl font-black text-stone-100">
              Perjalanan Dibalik Suka Nicky
            </h2>
            <p className="text-stone-400 text-xs leading-relaxed">
              Dari industri rumahan sederhana hingga menjadi ikon oleh-oleh khas
              Banjarnegara.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4 text-xs text-stone-300 leading-relaxed bg-stone-800/50 p-6 rounded-2xl border border-stone-700/60">
              <p>
                Usaha <strong className="text-white">Suka Nicky</strong>{" "}
                dirintis oleh Ibu <strong className="text-white">Sukini</strong>{" "}
                sejak tahun <strong className="text-amber-400">1996</strong> di
                Desa Gumiwang, Banjarnegara. Berawal dari produksi keripik
                pisang skala kecil, usaha ini konsisten menjaga kualitas mutu
                rasa.
              </p>
              <p>
                Inovasi besar terjadi pada tahun{" "}
                <strong className="text-amber-400">2004</strong> ketika Suka
                Nicky mulai memanfaatkan{" "}
                <strong className="text-white">tepung mocaf</strong> (singkong
                terfermentasi) sebagai campuran adonan keripik tempe. Hasilnya:
                keripik terasa lebih renyah, gurih alami, dan ramah pencernaan.
              </p>
              <p>
                Kini, produk Suka Nicky seperti Abon Ikan telah resmi lolos
                kurasi dan dipasarkan di jaringan toko modern{" "}
                <strong className="text-white">Indomaret</strong>.
              </p>
            </div>

            <div className="bg-stone-800 p-6 rounded-2xl border border-stone-700 space-y-4 text-xs">
              <h3 className="font-bold text-amber-400 uppercase text-xs tracking-wider border-b border-stone-700 pb-3">
                Jejak Langkah (Milestone)
              </h3>
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <span className="font-black text-amber-400 w-12 shrink-0 text-sm">
                    1996
                  </span>
                  <p className="text-stone-300">
                    Berdiri dari usaha produksi keripik pisang rumahan di Desa
                    Gumiwang.
                  </p>
                </div>
                <div className="flex gap-4 items-start">
                  <span className="font-black text-amber-400 w-12 shrink-0 text-sm">
                    2004
                  </span>
                  <p className="text-stone-300">
                    Pelopor penggunaan adonan tepung mocaf untuk keripik tempe
                    khas.
                  </p>
                </div>
                <div className="flex gap-4 items-start">
                  <span className="font-black text-amber-400 w-12 shrink-0 text-sm">
                    2014
                  </span>
                  <p className="text-stone-300">
                    Meraih Penghargaan Pameran Pangan Nusa Kategori Camilan Mutu
                    Unggul.
                  </p>
                </div>
                <div className="flex gap-4 items-start">
                  <span className="font-black text-amber-400 w-12 shrink-0 text-sm">
                    2023
                  </span>
                  <p className="text-stone-300">
                    Abon Ikan resmi dipasarkan di jaringan ritel modern
                    Indomaret.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TESTIMONI PELANGGAN */}
      <section className="max-w-6xl mx-auto px-4 py-12 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-stone-900">Ulasan Pembeli</h2>
          <p className="text-xs text-stone-500">
            Apa kata mereka yang sudah mencoba kelezatan Suka Nicky?
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 text-xs">
          <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-sm space-y-3">
            <div className="flex text-amber-500 gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
            <p className="text-stone-600 leading-relaxed">
              "Keripik tempe mocaf-nya nagih banget! Renyahnya beda sama keripik
              tempe biasa, gak keras pas digigit. Wajib beli kalau ke
              Banjarnegara."
            </p>
            <div className="pt-2 border-t border-stone-100 font-bold text-stone-900">
              Budi Santoso{" "}
              <span className="font-normal text-stone-400 text-[10px]">
                — Semarang
              </span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-sm space-y-3">
            <div className="flex text-amber-500 gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
            <p className="text-stone-600 leading-relaxed">
              "Abon ikannya juara. Gurihnya pas, gampang buat lauk anak-anak
              dirumah. Seneng banget sekarang udah ada di Indomaret juga."
            </p>
            <div className="pt-2 border-t border-stone-100 font-bold text-stone-900">
              Siti Rahmawati{" "}
              <span className="font-normal text-stone-400 text-[10px]">
                — Purwokerto
              </span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-sm space-y-3">
            <div className="flex text-amber-500 gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
            <p className="text-stone-600 leading-relaxed">
              "Pesan lewat WhatsApp responnya cepet banget. Dikirim ke Jakarta
              packing-nya rapi, gak ada keripik yang hancur. Mantap!"
            </p>
            <div className="pt-2 border-t border-stone-100 font-bold text-stone-900">
              Dian Wijaya{" "}
              <span className="font-normal text-stone-400 text-[10px]">
                — Jakarta Selatan
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. LOKASI & KONTAK */}
      <section id="lokasi" className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        <div className="bg-amber-900 text-white rounded-3xl p-8 md:p-12 text-center space-y-6 shadow-xl relative overflow-hidden">
          <div className="space-y-2 relative z-10">
            <h2 className="text-2xl md:text-3xl font-black">
              Ingin Pesan Grosir / Kunjungi Outlet?
            </h2>
            <p className="text-amber-200 text-xs max-w-lg mx-auto">
              Kami melayani pembelian eceran, oleh-oleh rombongan, hingga
              pengiriman luar kota via ekspedisi.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-xs relative z-10">
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl transition flex items-center gap-2 shadow-lg"
            >
              <Phone className="w-4 h-4" />
              <span>Hubungi Admin WhatsApp</span>
            </a>
          </div>

          <div className="pt-6 border-t border-amber-800/80 text-[11px] text-amber-200/80 flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              Desa Gumiwang, Kec. Purwanegara, Banjarnegara
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-amber-400" />
              Siap Kirim Seluruh Indonesia
            </span>
          </div>
        </div>
      </section>

      {/* MODAL DETAIL PRODUK */}
      {activeProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setActiveProduct(null)}
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
          ></div>
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl z-10 relative space-y-4 p-6 border border-stone-200 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setActiveProduct(null)}
              className="absolute top-4 right-4 p-1.5 bg-stone-100 hover:bg-stone-200 rounded-full text-stone-600 transition"
              aria-label="Tutup Modal"
            >
              <X className="w-4 h-4" />
            </button>

            <img
              src={activeProduct.image}
              alt={activeProduct.name}
              className="w-full h-56 object-cover rounded-xl bg-stone-100"
            />

            <div>
              <span className="text-[10px] font-bold uppercase bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                {activeProduct.category}
              </span>
              <h3 className="font-extrabold text-stone-900 text-lg mt-1">
                {activeProduct.name}
              </h3>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                {activeProduct.description}
              </p>
            </div>

            <div className="bg-stone-50 p-3 rounded-xl text-xs text-stone-600 space-y-1 border border-stone-200/60">
              <p>
                <strong>Kemasan:</strong> {activeProduct.weight}
              </p>
              {activeProduct.ingredients && (
                <p>
                  <strong>Komposisi:</strong> {activeProduct.ingredients}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-lg font-black text-amber-900">
                {formatRupiah(activeProduct.price)}
              </span>
              <button
                onClick={() => {
                  addToCart(activeProduct);
                  setActiveProduct(null);
                  setIsCartOpen(true);
                }}
                className="bg-emerald-800 hover:bg-emerald-900 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah ke Keranjang</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
