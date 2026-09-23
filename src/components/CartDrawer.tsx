"use client";

import { useState } from "react";
import { ShoppingCart, X, Plus, Minus, MessageCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    totalItems,
    totalPrice,
  } = useCart();

  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerNotes, setCustomerNotes] = useState("");

  if (!isCartOpen) return null;

  const handleCheckoutWA = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    let message = `*HALO SUKA NICKY, SAYA MAU PESAN OLEH-OLEH*\n`;
    message += `───────────────────────\n\n`;
    message += `*RINCIAN PESANAN:*\n`;

    cart.forEach((item, index) => {
      message += `${index + 1}. *${item.product.name}* (${item.product.weight})\n`;
      message += `   Qty: ${item.quantity} x Rp ${item.product.price.toLocaleString("id-ID")}\n`;
      message += `   Subtotal: Rp ${(item.product.price * item.quantity).toLocaleString("id-ID")}\n\n`;
    });

    message += `───────────────────────\n`;
    message += `*TOTAL BELANJA:* Rp ${totalPrice.toLocaleString("id-ID")}\n\n`;
    message += `*DATA PEMESAN:*\n`;
    message += `• Nama: ${customerName || "-"}\n`;
    message += `• Alamat Pengiriman: ${customerAddress || "-"}\n`;
    if (customerNotes) message += `• Catatan: ${customerNotes}\n`;
    message += `\nMohon diinformasikan total ongkir dan nomor rekening pembayaran. Terima kasih!`;

    const phoneAdmin = "6281234567890";
    window.open(
      `https://wa.me/${phoneAdmin}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
      ></div>

      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 overflow-hidden">
        <div className="p-4 border-b border-stone-200 flex justify-between items-center bg-stone-50">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-4 h-4 text-emerald-800" />
            <h3 className="font-bold text-stone-900 text-sm">
              Keranjang Belanja
            </h3>
            <span className="text-xs bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full font-bold">
              {totalItems}
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1 hover:bg-stone-200 rounded-lg text-stone-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-12 space-y-3 text-stone-400">
              <ShoppingCart className="w-12 h-12 mx-auto stroke-1" />
              <p className="text-xs">Keranjang belanjaanmu masih kosong.</p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200/60 items-center"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-14 h-14 object-cover rounded-lg shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-stone-900 text-xs truncate">
                    {item.product.name}
                  </h4>
                  <p className="text-[11px] text-amber-900 font-extrabold mt-0.5">
                    Rp {item.product.price.toLocaleString("id-ID")}
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-white border border-stone-200 rounded-lg p-1">
                  <button
                    onClick={() => updateQuantity(item.product.id, -1)}
                    className="p-0.5 hover:bg-stone-100 rounded text-stone-600"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-bold w-4 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.product.id, 1)}
                    className="p-0.5 hover:bg-stone-100 rounded text-stone-600"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}

          {cart.length > 0 && (
            <form
              id="checkout-form"
              onSubmit={handleCheckoutWA}
              className="pt-4 border-t border-stone-200 space-y-3"
            >
              <h4 className="font-bold text-xs text-stone-900">
                Lengkapi Data Pengiriman:
              </h4>
              <input
                type="text"
                required
                placeholder="Nama Lengkap Pemesan *"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-white"
              />
              <textarea
                required
                rows={2}
                placeholder="Alamat Pengiriman Lengkap *"
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-white"
              />
              <input
                type="text"
                placeholder="Catatan Tambahan (Opsional)"
                value={customerNotes}
                onChange={(e) => setCustomerNotes(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-white"
              />
            </form>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-4 border-t border-stone-200 bg-white space-y-3">
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-stone-500 font-medium">
                Total Harga:
              </span>
              <span className="text-lg font-black text-amber-900">
                Rp {totalPrice.toLocaleString("id-ID")}
              </span>
            </div>

            <button
              type="submit"
              form="checkout-form"
              className="w-full bg-emerald-800 hover:bg-emerald-900 text-white py-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-md active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Lanjutkan Pesan via WhatsApp</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
