"use client";

import { useState } from "react";
import Link from "next/link";
import { Product } from "@/data/products";
import { useProducts } from "@/context/ProductContext";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Package,
  CheckCircle2,
  X,
  Save,
  ArrowLeft,
  ShoppingBag,
  Layers,
  Lock,
  KeyRound,
  LogOut,
} from "lucide-react";

interface FormDataState {
  name: string;
  category: Product["category"];
  price: number;
  weight: string;
  description: string;
  image: string;
  ingredients: string;
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");

  const ADMIN_PIN = "1996";

  // Cast context ke 'any' agar TypeScript tidak komplain jika Context interface di ProductContext belum didefinisikan lengkap
  const { products, addProduct, updateProduct, deleteProduct } =
    useProducts() as any;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === ADMIN_PIN) {
      setIsAuthenticated(true);
      setPinError("");
    } else {
      setPinError("PIN Keamanan salah! Silakan coba lagi.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPinInput("");
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [formData, setFormData] = useState<FormDataState>({
    name: "",
    category: "Keripik" as Product["category"],
    price: 0,
    weight: "",
    description: "",
    image: "",
    ingredients: "",
  });

  const categories = [
    "Semua",
    "Keripik",
    "Olahan Ikan",
    "Dodol & Buah",
    "Kuliner Lokal",
  ];

  const filteredProducts = (products || []).filter((p: Product) => {
    const matchesCat =
      selectedCategory === "Semua" || p.category === selectedCategory;
    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        category: product.category,
        price: product.price,
        weight: product.weight || "",
        description: product.description || "",
        image: product.image,
        ingredients: product.ingredients || "",
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: "",
        category: "Keripik" as Product["category"],
        price: 0,
        weight: "200 gram",
        description: "",
        image:
          "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80",
        ingredients: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct?.({
        ...editingProduct,
        ...formData,
        price: Number(formData.price),
      });
    } else {
      const newProduct: Product = {
        id: `sn-${Date.now()}`,
        ...formData,
        price: Number(formData.price),
      };
      addProduct?.(newProduct);
    }
    setIsModalOpen(false);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm("Apakah kamu yakin ingin menghapus produk ini?")) {
      deleteProduct?.(id);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-stone-900 min-h-screen flex items-center justify-center p-4 text-stone-100">
        <div className="bg-stone-800 border border-stone-700/80 rounded-3xl p-8 max-w-md w-full shadow-2xl space-y-6 text-center">
          <div className="w-14 h-14 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-center mx-auto text-amber-400 shadow-inner">
            <Lock className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight">
              Admin Area Restricted
            </h1>
            <p className="text-xs text-stone-400 mt-1">
              Masukkan PIN Keamanan untuk mengakses dashboard inventaris Suka
              Nicky.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <KeyRound className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="password"
                required
                maxLength={6}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Masukkan PIN Admin (Bawaan: 1996)"
                className="w-full pl-11 pr-4 py-3 bg-stone-900 border border-stone-700 rounded-xl text-sm font-mono tracking-widest text-center text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {pinError && (
              <p className="text-xs text-rose-400 font-semibold bg-rose-950/50 p-2.5 rounded-xl border border-rose-800/50">
                {pinError}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-xl text-xs transition shadow-lg active:scale-95"
            >
              Verifikasi & Masuk
            </button>
          </form>

          <div className="pt-2 border-t border-stone-700/60">
            <Link
              href="/"
              className="text-xs text-stone-400 hover:text-white transition inline-flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Toko Utama</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-stone-100 min-h-screen text-stone-800 antialiased pb-16">
      <div className="bg-stone-900 text-white border-b border-stone-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 bg-stone-800 hover:bg-stone-700 rounded-xl text-stone-300 transition"
              title="Kembali ke Beranda Toko"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-bold px-2 py-0.5 rounded">
                  Admin Control Panel
                </span>
              </div>
              <h1 className="text-xl font-black text-stone-100 tracking-tight mt-0.5">
                Kelola Inventaris Produk
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleOpenModal()}
              className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-lg active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Produk</span>
            </button>

            <button
              onClick={handleLogout}
              className="bg-stone-800 hover:bg-rose-900/80 text-stone-300 hover:text-white p-2.5 rounded-xl text-xs transition border border-stone-700"
              title="Keluar / Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                Total Produk
              </p>
              <p className="text-2xl font-black text-stone-900">
                {products?.length || 0}
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                Status Aktif
              </p>
              <p className="text-2xl font-black text-stone-900">
                {products?.length || 0}
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                Total Kategori
              </p>
              <p className="text-2xl font-black text-stone-900">
                {categories.length - 1}
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                Rata-rata Harga
              </p>
              <p className="text-lg font-black text-amber-900">
                Rp{" "}
                {Math.round(
                  (products || []).reduce(
                    (acc: number, curr: Product) => acc + curr.price,
                    0,
                  ) / (products?.length || 1),
                ).toLocaleString("id-ID")}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Cari nama produk..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-700"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-amber-800 text-white shadow-sm"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200/80 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-stone-600">
              <thead className="bg-stone-50 text-stone-700 font-bold uppercase tracking-wider text-[10px] border-b border-stone-200">
                <tr>
                  <th className="px-6 py-4">Produk</th>
                  <th className="px-6 py-4">Kategori</th>
                  <th className="px-6 py-4">Harga</th>
                  <th className="px-6 py-4">Berat</th>
                  <th className="px-6 py-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredProducts.map((product: Product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-stone-50/80 transition"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-xl border border-stone-200 shrink-0"
                        />
                        <div>
                          <p className="font-bold text-stone-900 text-sm line-clamp-1">
                            {product.name}
                          </p>
                          <p className="text-[11px] text-stone-400 line-clamp-1">
                            ID: {product.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2.5 py-1 rounded-md">
                        {product.category}
                      </span>
                    </td>

                    <td className="px-6 py-4 font-black text-amber-900 text-sm">
                      Rp {product.price.toLocaleString("id-ID")}
                    </td>

                    <td className="px-6 py-4 text-stone-500 font-medium">
                      {product.weight || "-"}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleOpenModal(product)}
                          className="p-2 bg-stone-100 hover:bg-amber-100 text-stone-700 hover:text-amber-800 rounded-xl transition"
                          title="Edit Produk"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-2 bg-stone-100 hover:bg-rose-100 text-stone-700 hover:text-rose-700 rounded-xl transition"
                          title="Hapus Produk"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm"
          ></div>

          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl z-10 relative space-y-5 border border-stone-200">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-extrabold text-stone-900 text-base">
                {editingProduct ? "Edit Produk" : "Tambah Produk Baru"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 bg-stone-100 hover:bg-stone-200 rounded-full text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Nama Produk
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Kategori
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value as Product["category"],
                      })
                    }
                    className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-700"
                  >
                    {categories
                      .filter((c) => c !== "Semua")
                      .map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Harga (Rp)
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        price: Number(e.target.value),
                      })
                    }
                    className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Berat Kemasan
                  </label>
                  <input
                    type="text"
                    value={formData.weight}
                    onChange={(e) =>
                      setFormData({ ...formData, weight: e.target.value })
                    }
                    className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-700"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    URL Gambar Produk
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-700"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Komposisi Bahan
                </label>
                <input
                  type="text"
                  value={formData.ingredients}
                  onChange={(e) =>
                    setFormData({ ...formData, ingredients: e.target.value })
                  }
                  className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-700"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">
                  Deskripsi Singkat
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-700"
                ></textarea>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-xl transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-800 hover:bg-amber-900 text-white font-bold rounded-xl transition flex items-center gap-1.5 shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Produk</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
