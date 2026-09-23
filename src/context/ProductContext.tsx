"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, PRODUCTS_DATA } from "@/data/products";

export interface ProductContextType {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string | number) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const STORAGE_KEY = "suka_nicky_products_v1";

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // 1. Ambil data dari LocalStorage saat pertama kali aplikasi dimuat
  useEffect(() => {
    const savedProducts = localStorage.getItem(STORAGE_KEY);
    if (savedProducts) {
      try {
        setProducts(JSON.parse(savedProducts));
      } catch (error) {
        console.error("Gagal parse localStorage:", error);
        setProducts(PRODUCTS_DATA || []);
      }
    } else {
      setProducts(PRODUCTS_DATA || []);
    }
    setIsInitialized(true);
  }, []);

  // 2. Simpan otomatis ke LocalStorage setiap kali data produk berubah (tambah/edit/hapus)
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    }
  }, [products, isInitialized]);

  const addProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((p) =>
        String(p.id) === String(updatedProduct.id) ? updatedProduct : p,
      ),
    );
  };

  // 3. Konversi ID ke String agar aman dari perbedaan tipe angka vs teks
  const deleteProduct = (id: string | number) => {
    setProducts((prev) => prev.filter((p) => String(p.id) !== String(id)));
  };

  return (
    <ProductContext.Provider
      value={{ products, addProduct, updateProduct, deleteProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
}
